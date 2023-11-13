//create a sveltekit endpoint\

import { customResponse } from '$lib/CustomResponse';
import { db } from '$lib/server/database';
import { bossesTable } from '$lib/server/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, params }) => {
    console.log(url.pathname, 'requested.');
    console.log(typeof params.game);
    console.log(params.game);

    // Checks for gameId in the url
    if (typeof params.game === 'undefined') {
        return json(customResponse(400, 'Please provide a game and a bossId.'));
    }

    // Returns all bosses
    if (params.game === 'all') {
        try {
            const dataArray = await db.select().from(bossesTable);
            if (dataArray.length === 0) {
                return json(customResponse(204, 'No bosses found.', []));
            } else {
                return json(customResponse(200, 'Ok', dataArray));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            return json(customResponse(500, `Internal Server Error ${error}`));
        }
    }

    // Returns all bosses for a specific gameId
    try {
        const dataArray = await db
            .select()
            .from(bossesTable)
            .where(eq(bossesTable.bossGame, +params.game));
        if (dataArray.length === 0) {
            return json(customResponse(204, `No bosses found for game: ${params.game}.`, []));
        } else {
            return json(customResponse(200, 'Ok', dataArray));
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return json(customResponse(500, `Internal Server Error ${error}`));
    }
};
