import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossesTable,
	bossRatingsTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { eq, and, avg, sql, count, ne, gt } from 'drizzle-orm';
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
			gameId: gamesTable.gameId,
			gameTitle: gamesTable.gameTitle,
			runName: runsTable.runName,
			runStartDate: runsTable.runStartDate,
			runEndDate: runsTable.runEndDate,
			experience: runsTable.experience,
			userId: userTable.id,
			displayName: userTable.displayName,
			profilePicture: userTable.profilePicture
		})
		.from(runsTable)
		.innerJoin(gamesTable, eq(gamesTable.gameId, runsTable.gameId))
		.innerJoin(userTable, eq(userTable.id, runsTable.runUser))
		.where(eq(runsTable.runId, params.id));

	const runData = runDataArray[0];

	const run = {
		id: runData.runId,
		gameId: runData.gameId,
		gameTitle: runData.gameTitle,
		name: runData.runName,
		startDate: runData.runStartDate,
		startDateString: getDateString(runData.runStartDate),
		endDate: runData.runEndDate,
		endDateString: runData.runEndDate ? getDateString(runData.runEndDate) : null,
		experience: runData.experience,
		latestKill: null
	};

	const [
		bossesData,
		deathData,
		ratingData,
		experienceSpecificDeathData,
		killCounts,
		userRatingsData
	] = await Promise.all([
		db.select().from(bossesTable).where(eq(bossesTable.bossGame, run.gameId)),
		db.select().from(bossDeathsInRunTable).where(eq(bossDeathsInRunTable.runId, run.id)),
		db
			.select({
				bossId: bossRatingsTable.bossId,
				avgEnjoymentRating: sql`AVG(${bossRatingsTable.enjoymentRating})`,
				avgDifficultyRating: sql`AVG(${bossRatingsTable.difficultyRating})`,
				numRatings: sql`COUNT(${bossRatingsTable.ratingId})`
			})
			.from(bossRatingsTable)
			.groupBy(bossRatingsTable.bossId),
		db
			.select({
				bossId: bossDeathsInRunTable.bossId,
				avgDeaths: sql`AVG(${bossDeathsInRunTable.deathCount})`,
				runCount: count(runsTable.runId)
			})
			.from(bossDeathsInRunTable)
			.innerJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
			.where(gt(bossDeathsInRunTable.deathDate, 0))
			.groupBy(bossDeathsInRunTable.bossId),
		db
			.select({
				bossId: bossDeathsInRunTable.bossId,
				killCount: sql`COUNT(${bossDeathsInRunTable.bossId})`
			})
			.from(bossDeathsInRunTable)
			.innerJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
			.groupBy(bossDeathsInRunTable.bossId),
		db
			.select({
				bossId: bossRatingsTable.bossId,
				enjoymentRating: bossRatingsTable.enjoymentRating,
				difficultyRating: bossRatingsTable.difficultyRating
			})
			.from(bossRatingsTable)
			.where(eq(bossRatingsTable.userId, runData.userId))
	]);

	const bosses = bossesData.map((boss) => {
		const { killColour, killText } = getKillButtonInfo(boss.bossId);
		const death = deathData.find((death) => death.bossId === boss.bossId);
		const rating = ratingData.find((rating) => rating.bossId === boss.bossId);
		const experienceSpecificDeath = experienceSpecificDeathData.find(
			(data) => data.bossId === boss.bossId
		);
		const killCount = killCounts.find((count) => count.bossId === boss.bossId);
		const userRating = userRatingsData.find((rating) => rating.bossId === boss.bossId);

		return {
			id: boss.bossId,
			bossImage:
				boss.bossImage ??
				'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images//aborr.png',
			name: boss.bossName,
			deaths: death?.deathCount ?? 0,
			deathDate: death?.deathDate ?? null,
			deathDateString: death?.deathDate ? getDateString(death?.deathDate) : null,
			deathTimeSince: death?.deathDate ? getTimeSinceEpoch(death?.deathDate) : null,
			avgEnjoymentRating: rating?.avgEnjoymentRating ?? 0,
			avgDifficultyRating: rating?.avgDifficultyRating ?? 0,
			avgDeaths: experienceSpecificDeath?.avgDeaths ?? 0,
			numRatings: rating?.numRatings ?? 0,
			numRuns: experienceSpecificDeath?.runCount ?? 0,
			killCount: killCount?.killCount ?? 0,
			userEnjoymentRating: userRating?.enjoymentRating ?? null,
			userDifficultyRating: userRating?.difficultyRating ?? null,
			killText,
			killColour
		};
	});

	run.latestKill = getBossWithSoonestDeath(bosses) || 'No bosses killed';

	const user = {
		id: runData.userId,
		displayName: runData.displayName,
		profilePicture: runData.profilePicture
	};

	return { run, user, bosses };
};
