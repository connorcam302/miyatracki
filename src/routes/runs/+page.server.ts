import { db } from '$lib/server/database';
import { bossDeathsInRunTable, gamesTable, runsTable, userTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ fetch, data }) => {
    const games = await db.select().from(gamesTable);
    const runsData = await db
        .select()
        .from(runsTable)
        .innerJoin(gamesTable, eq(gamesTable.gameId, runsTable.gameId))
        .innerJoin(userTable, eq(userTable.id, runsTable.runUser))
        .leftJoin(bossDeathsInRunTable, eq(bossDeathsInRunTable.runId, runsTable.runId));

    const runs = runsData.map((run) => {
        return {
            id: run.Runs.runId,
            userId: run.User.id,
            userName: run.User.displayName,
            profilePicture: run.User.profilePicture,
            gameId: run.Games.gameId,
            gameTitle: run.Games.gameTitle,
            runName: run.Runs.runName,
            runStartDate: run.Runs.runStartDate,
            runEndDate: run.Runs.runEndDate,
            experience: run.Runs.experience,
            bossDeaths: run.BossDeathsInRun
        };
    });
    console.log(runs);

    return { games, runs };
};
