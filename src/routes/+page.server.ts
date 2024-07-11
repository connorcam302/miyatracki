import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossRatingsTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { and, asc, avg, count, desc, eq, sql } from 'drizzle-orm';
import gameList from '$lib/data/games';

export const load = async ({ fetch, data, params }) => {
	const bossRankings = await db
		.select({
			bossId: bossesTable.bossId,
			bossName: bossesTable.bossName,
			enjoymentRating: avg(bossRatingsTable.enjoymentRating),
			difficultyRating: avg(bossRatingsTable.difficultyRating),

			combinedRating: sql`((${avg(bossRatingsTable.enjoymentRating)}*0.7) + (${avg(
				bossRatingsTable.difficultyRating
			)}*0.3))*10`,

			ratingCount: count(bossRatingsTable.ratingId)
		})
		.from(bossesTable)
		.leftJoin(bossRatingsTable, eq(bossesTable.bossId, bossRatingsTable.bossId))
		.groupBy(bossesTable.bossId, bossesTable.bossName)
		.having(sql`${count(bossRatingsTable.ratingId)} >= 2`)
		.orderBy(
			desc(
				sql`((${avg(bossRatingsTable.enjoymentRating)}*0.7) + (${avg(
					bossRatingsTable.difficultyRating
				)}*0.3))*10`
			)
		)
		.limit(32);

	const bossDeaths = await db
		.select({
			bossId: bossesTable.bossId,
			bossName: bossesTable.bossName,
			deaths: avg(bossDeathsInRunTable.deathCount),
			runCount: count(runsTable.runId)
		})
		.from(bossesTable)
		.leftJoin(bossDeathsInRunTable, eq(bossesTable.bossId, bossDeathsInRunTable.bossId))
		.leftJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
		.groupBy(bossesTable.bossId, bossesTable.bossName)
		.having(sql`${count(runsTable.runId)} >= 2`)
		.orderBy(desc(avg(bossDeathsInRunTable.deathCount)))
		.limit(32);

	const games = gameList;

	return { bossRankings, bossDeaths, games };
};
