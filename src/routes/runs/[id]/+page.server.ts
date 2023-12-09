import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ fetch, data, params }) => {
	const runDataArray = await db
		.select()
		.from(runsTable)
		.where(eq(runsTable.runId, params.id))
		.innerJoin(gamesTable, eq(gamesTable.gameId, runsTable.gameId))
		.innerJoin(userTable, eq(userTable.id, runsTable.runUser));

	const runData = runDataArray[0];
	const run = {
		id: runData.Runs.runId,
		gameId: runData.Games.gameId,
		gameTitle: runData.Games.gameTitle,
		runName: runData.Runs.runName,
		runStartDate: runData.Runs.runStartDate,
		runEndDate: runData.Runs.runEndDate,
		experience: runData.Runs.experience
	};

	const bossesData = await db
		.select()
		.from(bossesTable)
		.leftJoin(bossDeathsInRunTable, eq(bossDeathsInRunTable.bossId, bossesTable.bossId))
		.leftJoin(runsTable, eq(runsTable.runId, bossDeathsInRunTable.runId))
		.where(eq(bossesTable.bossGame, run.gameId));

	const bosses = bossesData.map((boss) => {
		return {
			id: boss.Bosses.bossId,
			name: boss.Bosses.bossName,
			deaths: boss.BossDeathsInRun?.deathCount ?? 0,
			deathDate: boss.BossDeathsInRun?.deathDate ?? null
		};
	});

	const user = {
		id: runData.User.id,
		displayName: runData.User.displayName,
		profilePicture: runData.User.profilePicture
	};

	return { run, user, bosses };
};
