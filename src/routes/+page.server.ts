import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossRatingsTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { desc, eq } from 'drizzle-orm';

export const load = async ({ fetch, data, params }) => {
	const users = await db.select().from(userTable);

	const runs = await db
		.select({
			runName: runsTable.runName,
			runId: runsTable.runId,
			experience: runsTable.experience,
			game: runsTable.gameId,
			gameName: gamesTable.gameTitle,
			userId: userTable.id,
			username: userTable.displayName,
			userPicture: userTable.profilePicture,
			runDate: runsTable.runStartDate
		})
		.from(runsTable)
		.innerJoin(userTable, eq(runsTable.runUser, userTable.id))
		.innerJoin(gamesTable, eq(runsTable.gameId, gamesTable.gameId));

	const runWithBossesPromise = runs.map(async (run) => {
		const bosses = await db
			.select({
				bossId: bossDeathsInRunTable.bossId,
				bossName: bossesTable.bossName,
				runId: bossDeathsInRunTable.runId,
				deathTime: bossDeathsInRunTable.deathDate,
				deathCount: bossDeathsInRunTable.deathCount,
				enjoyment: bossRatingsTable.enjoymentRating,
				difficulty: bossRatingsTable.difficultyRating
			})
			.from(bossDeathsInRunTable)
			.innerJoin(bossesTable, eq(bossDeathsInRunTable.bossId, bossesTable.bossId))
			.leftJoin(bossRatingsTable, eq(bossDeathsInRunTable.bossId, bossRatingsTable.bossId))
			.where(eq(bossDeathsInRunTable.runId, run.runId))
			.orderBy(desc(bossDeathsInRunTable.deathDate))
			.limit(1);

		return { ...run, ...bosses[0] };
	});

	const runBlocks = await Promise.all(runWithBossesPromise);

	runBlocks.sort((a, b) => (a.deathTime! > b.deathTime! ? -1 : 1));

	const pages = [];
	for (let i = 0; i < runBlocks.length; i += 5) {
		const page = runBlocks.slice(i, i + 5);
		pages.push(page);
	}

	return { users, runBlocks, pages };
};
