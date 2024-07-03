import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { bossesTable, gamesTable, runsTable, userTable } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';
import { eq, like, or } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, params }) => {
    console.log(url.pathname, 'requested.');
    const term = params.term;

    try {
        const run = await db
            .select({
                runId: runsTable.runId,
                runName: runsTable.runName,
                runStartDate: runsTable.runStartDate,
                runEndDate: runsTable.runEndDate,
                experience: runsTable.experience,
                userId: userTable.id,
                displayName: userTable.displayName,
                profilePicture: userTable.profilePicture,
                gameId: gamesTable.gameId,
                gameTitle: gamesTable.gameTitle
            })
            .from(runsTable)
            .innerJoin(userTable, eq(userTable.id, runsTable.runUser))
            .innerJoin(gamesTable, eq(gamesTable.gameId, runsTable.gameId))
            .where(
                or(
                    like(runsTable.runName, `%${term}%`),
                    like(userTable.displayName, `%${term}%`),
                    like(gamesTable.gameTitle, `%${term}%`)
                )
            );

        const user = await db
            .select({
                userId: userTable.id,
                displayName: userTable.displayName,
                email: userTable.email,
                profilePicture: userTable.profilePicture
            })
            .from(userTable)
            .where(or(like(userTable.displayName, `%${term}%`), like(userTable.email, `%${term}%`)));

        const boss = await db
            .select({
                bossId: bossesTable.bossId,
                bossName: bossesTable.bossName,
                bossImage: bossesTable.bossImage,
                bossGame: bossesTable.bossGame,
                gameTitle: gamesTable.gameTitle
            })
            .from(bossesTable)
            .innerJoin(gamesTable, eq(gamesTable.gameId, bossesTable.bossGame))
            .where(like(bossesTable.bossName, `%${term}%`));

        const game = await db
            .select({
                gameId: gamesTable.gameId,
                gameTitle: gamesTable.gameTitle
            })
            .from(gamesTable)
            .where(like(gamesTable.gameTitle, `%${term}%`));

        return json(
            customResponse(200, 'Ok', {
                run,
                user,
                boss,
                game
            })
        );
    } catch (error) {
        console.error('Error fetching user:', error);
        return json(customResponse(500, 'Internal Server Error'));
    }
};
