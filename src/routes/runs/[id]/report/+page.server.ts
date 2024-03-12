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
import { eq, and, avg } from 'drizzle-orm';
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

	const bossAverages = await db
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

	const bossData = await db
		.select({
			bossId: bossDeathsInRunTable.bossId,
			deaths: bossDeathsInRunTable.deathCount,
			deathDate: bossDeathsInRunTable.deathDate,
			difficulty: bossRatingsTable.difficultyRating,
			enjoyment: bossRatingsTable.enjoymentRating
		})
		.from(bossesTable)
		.innerJoin(bossDeathsInRunTable, eq(bossesTable.bossId, bossDeathsInRunTable.bossId))
		.innerJoin(bossRatingsTable, eq(bossRatingsTable.bossId, bossesTable.bossId))
		.where(
			and(
				eq(bossRatingsTable.userId, runDataArray[0].user.id),
				eq(bossDeathsInRunTable.runId, params.id)
			)
		);

	console.log(bossData);

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
			difficulty: bossData.find((data) => data.bossId === boss.bossId)?.difficulty || 0,
			enjoyment: bossData.find((data) => data.bossId === boss.bossId)?.enjoyment || 0
		};
	});

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
		})
	];

	return { runData: runDataArray[0], reports };
};
