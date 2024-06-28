import { customResponse } from '$lib/CustomResponse';
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { bossDeathsInRunTable, bossesTable, gamesTable, runsTable } from '$lib/server/schema';
import { count, eq, desc, max, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, params }) => {
    console.log(url.pathname, 'requested.');
    const id = Number(params.id);
    try {
        console.log(id);
        const runs = await db
            .select({
                runId: runsTable.runId,
                runName: runsTable.runName,
                runStartDate: runsTable.runStartDate,
                runEndDate: runsTable.runEndDate,
                experience: runsTable.experience,
                bossKills: count(bossDeathsInRunTable.deathId),
                mostRecentKillDate: max(bossDeathsInRunTable.deathDate),
                totalBossesInGame: sql`(SELECT COUNT(*) FROM ${bossesTable} WHERE ${bossesTable.bossGame} = ${runsTable.gameId})`,
                gameTitle: gamesTable.gameTitle
            })
            .from(runsTable)
            .leftJoin(bossDeathsInRunTable, eq(runsTable.runId, bossDeathsInRunTable.runId))
            .leftJoin(gamesTable, eq(runsTable.gameId, gamesTable.gameId))
            .where(eq(runsTable.runUser, id))
            .groupBy(
                runsTable.runId,
                runsTable.runName,
                runsTable.runStartDate,
                runsTable.runEndDate,
                runsTable.experience,
                runsTable.gameId,
                gamesTable.gameTitle
            )
            .orderBy(desc(runsTable.runStartDate))
            .execute();

        return json(customResponse(200, `Ok`, runs));
    } catch (error) {
        console.error('Error fetching runs:', error);
        return json(customResponse(500, `Internal Server Error ${error}`));
    }
};
