import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossRatingsTable,
	bossesTable,
	dlcTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { eq, and, avg, sql } from 'drizzle-orm';
import {
	getDateString,
	getBossWithSoonestDeath,
	getKillButtonInfo,
	getTimeSinceEpoch
} from '$lib/functions';

export const load = async ({ fetch, data, params }) => {
	const runDataArray = await db
		.select({
			runId: runsTable.runId,
			runName: runsTable.runName,
			runDate: runsTable.runStartDate,
			user: {
				id: userTable.id,
				username: userTable.displayName,
				profilePicture: userTable.profilePicture
			},
			gameId: gamesTable.gameId,
			gameTitle: gamesTable.gameTitle,
			experience: runsTable.experience
		})
		.from(runsTable)
		.where(eq(runsTable.runId, params.id))
		.innerJoin(gamesTable, eq(gamesTable.gameId, runsTable.gameId))
		.innerJoin(userTable, eq(userTable.id, runsTable.runUser));

	const bossList = await db
		.select({
			bossId: bossesTable.bossId,
			bossName: bossesTable.bossName,
			dlcId: bossesTable.bossDlc,
			dlcName: dlcTable.dlcTitle
		})
		.from(bossesTable)
		.leftJoin(dlcTable, eq(dlcTable.dlcId, bossesTable.bossDlc))
		.where(eq(bossesTable.bossGame, runDataArray[0].gameId));

	const bossData = await db
		.select({
			bossId: bossesTable.bossId,
			bossName: bossesTable.bossName,
			deaths: bossDeathsInRunTable.deathCount,
			deathDate: bossDeathsInRunTable.deathDate,
			difficulty: bossRatingsTable.difficultyRating,
			enjoyment: bossRatingsTable.enjoymentRating
		})
		.from(bossesTable)
		.leftJoin(
			bossDeathsInRunTable,
			and(
				eq(bossesTable.bossId, bossDeathsInRunTable.bossId),
				eq(bossDeathsInRunTable.runId, params.id)
			)
		)
		.leftJoin(
			bossRatingsTable,
			and(
				eq(bossRatingsTable.bossId, bossesTable.bossId),
				eq(bossRatingsTable.userId, runDataArray[0].user.id)
			)
		);

	const averageDeaths = await db
		.select({
			bossId: bossesTable.bossId,
			averageDeaths: avg(bossDeathsInRunTable.deathCount)
		})
		.from(bossesTable)
		.fullJoin(bossDeathsInRunTable, eq(bossesTable.bossId, bossDeathsInRunTable.bossId))
		.fullJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
		.where(
			and(
				eq(bossesTable.bossGame, runDataArray[0].gameId),
				eq(runsTable.experience, runDataArray[0].experience)
			)
		)
		.groupBy(bossesTable.bossId);

	// Query to get average ratings without filtering by experience level
	const averageRatings = await db
		.select({
			bossId: bossesTable.bossId,
			averageDifficulty: avg(bossRatingsTable.difficultyRating),
			averageEnjoyment: avg(bossRatingsTable.enjoymentRating)
		})
		.from(bossesTable)
		.leftJoin(bossRatingsTable, eq(bossesTable.bossId, bossRatingsTable.bossId))
		.where(eq(bossesTable.bossGame, runDataArray[0].gameId))
		.groupBy(bossesTable.bossId)
		.execute(); // Combine the results in your application code

	const bossAverages = averageDeaths.map((deathRecord) => {
		const ratingRecord = averageRatings.find((rating) => rating.bossId === deathRecord.bossId);
		return {
			bossId: deathRecord.bossId,
			averageDeaths: deathRecord.averageDeaths,
			averageDifficulty: ratingRecord ? ratingRecord.averageDifficulty : null,
			averageEnjoyment: ratingRecord ? ratingRecord.averageEnjoyment : null
		};
	});

	const gameDlcs = await db
		.select({
			dlcId: dlcTable.dlcId,
			dlcTitle: dlcTable.dlcTitle
		})
		.from(dlcTable)
		.where(eq(dlcTable.dlcGame, runDataArray[0].gameId));

	const bossesArray = bossList.map((boss) => {
		return {
			...boss,
			averageDeaths: Number(
				bossAverages.find((average) => average.bossId === boss.bossId)?.averageDeaths || 0
			),
			deaths:
				bossData.find((data) => data.bossId === boss.bossId)?.deaths > -1
					? bossData.find((data) => data.bossId === boss.bossId)?.deaths
					: null,
			deathDate: bossData.find((data) => data.bossId === boss.bossId)?.deathDate || 0,
			difficulty: bossData.find((data) => data.bossId === boss.bossId)?.difficulty || '-',
			averageDifficulty:
				bossAverages.find((average) => average.bossId === boss.bossId)?.averageDifficulty || 0,
			enjoyment: bossData.find((data) => data.bossId === boss.bossId)?.enjoyment || '-',
			averageEnjoyment:
				bossAverages.find((average) => average.bossId === boss.bossId)?.averageEnjoyment || 0
		};
	});

	const trimmedBossData = bossesArray.filter((average) => average.deathDate !== 0);

	const reports = [
		{
			id: -1,
			name: 'Base Game',
			bosses: bossesArray.filter((boss) => boss.dlcId === null)
		},
		...gameDlcs.map((dlc) => {
			return {
				id: dlc.dlcId,
				name: dlc.dlcTitle,
				bosses: bossesArray.filter((boss) => boss.dlcId === dlc.dlcId)
			};
		}),
		{
			id: 'total',
			name: 'Total',
			bosses: [
				{
					bossId: -1,
					bossName: 'Total',
					// average deaths for every boss totalled
					averageDeaths: bossAverages
						.reduce((acc, boss) => acc + Number(boss.averageDeaths), 0)
						.toFixed(1),
					deaths: bossData.reduce((acc, boss) => acc + boss.deaths, 0),
					deathDate: getBossWithSoonestDeath(bossData).deathDate,
					// get the average difficulty and enjoyment from bossdata for every boss totalled
					difficulty:
						(
							trimmedBossData.reduce((acc, boss) => acc + boss.difficulty, 0) /
							trimmedBossData.length
						).toFixed(1) || 0,
					averageDifficulty:
						(
							trimmedBossData.reduce((acc, boss) => acc + Number(boss.averageDifficulty), 0) /
							trimmedBossData.length
						).toFixed(1) || 0,
					enjoyment:
						(
							trimmedBossData.reduce((acc, boss) => acc + boss.enjoyment, 0) /
							trimmedBossData.length
						).toFixed(1) || 0,
					averageEnjoyment:
						(
							trimmedBossData.reduce((acc, boss) => acc + Number(boss.averageEnjoyment), 0) /
							trimmedBossData.length
						).toFixed(1) || 0
				}
			]
		}
	];

	return { runData: runDataArray[0], reports };
};
