import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';
import {
	getDateString,
	getBossWithSoonestDeath,
	getKillButtonInfo,
	getTimeSinceEpoch
} from '$lib/functions';

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
		.where(eq(bossesTable.bossGame, run.gameId));

	const deathData = await db
		.select()
		.from(bossDeathsInRunTable)
		.where(eq(bossDeathsInRunTable.runId, run.id));

	console.log(bossesData);

	const bosses = bossesData.map((boss) => {
		const { killColour, killText } = getKillButtonInfo(boss.bossId);

		const death = deathData.find((death) => death.bossId === boss.bossId);

		return {
			id: boss.bossId,
			bossImage:
				boss.bossImage ??
				'https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/asylumdemon.webp',
			name: boss.bossName,
			deaths: death?.deathCount ?? 0,
			deathDate: death?.deathDate ?? null,
			deathDateString: death?.deathDate ? getDateString(death?.deathDate) : null,
			deathTimeSince: death?.deathDate ? getTimeSinceEpoch(death?.deathDate) : null,
			killText,
			killColour
		};
	});

	run.latestKill =
		getBossWithSoonestDeath(bosses) !== null ? getBossWithSoonestDeath(bosses) : 'No bosses killed';

	const user = {
		id: runData.User.id,
		displayName: runData.User.displayName,
		profilePicture: runData.User.profilePicture
	};

	console.log('backend called');

	return { run, user, bosses };
};
