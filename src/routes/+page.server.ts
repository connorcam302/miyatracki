import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossRatingsTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { and, desc, eq, sql } from 'drizzle-orm';

export const load = async ({ fetch, data, params }) => {
	const runs = await db
		.select({
			runName: runsTable.runName,
			displayName: userTable.displayName,
			lastBossKilled: bossesTable.bossName
		})
		.from(runsTable)
		.innerJoin(userTable, eq(runsTable.runUser, userTable.id))
		.innerJoin(gamesTable, eq(runsTable.gameId, gamesTable.gameId))
		.innerJoin(bossDeathsInRunTable, eq(runsTable.runId, bossDeathsInRunTable.runId))
		.innerJoin(bossesTable, eq(bossDeathsInRunTable.bossId, bossesTable.bossId))
		.leftJoin(
			bossRatingsTable,
			and(
				eq(runsTable.runUser, bossRatingsTable.userId),
				eq(bossDeathsInRunTable.bossId, bossRatingsTable.bossId)
			)
		)
		.where(sql`${bossDeathsInRunTable.deathDate} IS NOT NULL`)
		.orderBy(desc(bossDeathsInRunTable.deathDate));
	console.log(runs);
};
