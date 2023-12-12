import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { getDateString, getBossWithSoonestDeath, getKillButtonInfo } from '$lib/functions';

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
		name: runData.Runs.runName,
		startDate: runData.Runs.runStartDate,
		startDateString: getDateString(runData.Runs.runStartDate),
		endDate: runData.Runs.runEndDate,
		endDateString: runData.Runs.runEndDate ? getDateString(runData.Runs.runEndDate) : null,
		experience: runData.Runs.experience,
		latestKill: null
	};

	const bossesData = await db
		.select()
		.from(bossesTable)
		.leftJoin(bossDeathsInRunTable, eq(bossDeathsInRunTable.bossId, bossesTable.bossId))
		.leftJoin(runsTable, eq(runsTable.runId, bossDeathsInRunTable.runId))
		.where(eq(bossesTable.bossGame, run.gameId));

	const bosses = bossesData.map((boss) => {
		const { buttonColour, buttonText } = getKillButtonInfo(boss.Bosses.bossId);

		return {
			id: boss.Bosses.bossId,
			name: boss.Bosses.bossName,
			deaths: boss.BossDeathsInRun?.deathCount ?? 0,
			deathDate: boss.BossDeathsInRun?.deathDate ?? null,
			buttonText,
			buttonColour
		};
	});

	run.latestKill =
		getBossWithSoonestDeath(bosses) !== null ? getBossWithSoonestDeath(bosses) : 'No bosses killed';

	const user = {
		id: runData.User.id,
		displayName: runData.User.displayName,
		profilePicture: runData.User.profilePicture
	};

	return { run, user, bosses };
};
