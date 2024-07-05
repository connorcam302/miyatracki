import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { bossesTable, bossRatingsTable } from '$lib/server/schema';
import { db } from '$lib/server/database';
import { and, eq } from 'drizzle-orm';
import { customResponse } from '$lib/CustomResponse';

export const GET: RequestHandler = async ({ url, request, params }) => {
	console.log(url.pathname, ' requested');

	const bossRatings = await db
		.select({
			bossId: bossRatingsTable.bossId,
			bossName: bossesTable.bossName,
			enjoymentRating: bossRatingsTable.enjoymentRating,
			difficultyRating: bossRatingsTable.difficultyRating
		})
		.from(bossRatingsTable)
		.innerJoin(bossesTable, eq(bossesTable.bossId, bossRatingsTable.bossId))
		.where(
			and(
				eq(bossRatingsTable.userId, Number(params.userId)),
				eq(bossesTable.bossGame, Number(params.gameId))
			)
		);

	return json(customResponse(200, 'Ok', bossRatings));
};
