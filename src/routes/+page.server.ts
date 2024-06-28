import { db } from '$lib/server/database';
import {
    bossDeathsInRunTable,
    bossRatingsTable,
    bossesTable,
    gamesTable,
    runsTable,
    userTable
} from '$lib/server/schema';
import { and, avg, count, desc, eq, sql } from 'drizzle-orm';

export const load = async ({ fetch, data, params }) => {
    const bossRankings = await db
        .select({
            bossId: bossesTable.bossId,
            bossName: bossesTable.bossName,
            avgEnjoymentRating: avg(bossRatingsTable.enjoymentRating),
            avgDifficultyRating: avg(bossRatingsTable.difficultyRating),
            combinedAverageRating: sql`${avg(bossRatingsTable.enjoymentRating)} * ${avg(
                bossRatingsTable.difficultyRating
            )}`,
            ratingCount: count(bossRatingsTable.ratingId)
        })
        .from(bossesTable)
        .leftJoin(bossRatingsTable, eq(bossesTable.bossId, bossRatingsTable.bossId))
        .groupBy(bossesTable.bossId, bossesTable.bossName)
        .having(sql`${count(bossRatingsTable.ratingId)} >= 2`)
        .orderBy(
            desc(
                sql`${avg(bossRatingsTable.enjoymentRating)} * ${avg(bossRatingsTable.difficultyRating)}`
            )
        )
        .limit(32);

    const bossAverageDeaths = await db
        .select({
            bossId: bossesTable.bossId,
            bossName: bossesTable.bossName,
            avgDeaths: avg(bossDeathsInRunTable.deathCount),
            runCount: count(runsTable.runId)
        })
        .from(bossesTable)
        .leftJoin(bossDeathsInRunTable, eq(bossesTable.bossId, bossDeathsInRunTable.bossId))
        .leftJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
        .groupBy(bossesTable.bossId, bossesTable.bossName)
        .having(sql`${count(runsTable.runId)} >= 2`)
        .orderBy(desc(avg(bossDeathsInRunTable.deathCount)))
        .limit(32);

    return { bossRankings, bossAverageDeaths };
};
