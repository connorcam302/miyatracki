import { customResponse } from '$lib/CustomResponse';
import { json, type RequestHandler } from '@sveltejs/kit';
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

export const GET: RequestHandler = async ({ url }) => {
	console.log(url.pathname, 'requested.');
	const page = url.searchParams.get('page');
	console.log(page);
	try {
		const runs = await db
			.select({
				runId: runsTable.runId,
				runName: runsTable.runName,
				userId: userTable.id,
				displayName: userTable.displayName,
				gameTitle: gamesTable.gameTitle,
				experience: runsTable.experience,
				bossId: bossDeathsInRunTable.bossId,
				bossName: bossesTable.bossName,
				deathDate: bossDeathsInRunTable.deathDate,
				deathCount: bossDeathsInRunTable.deathCount,
				enjoymentRating: bossRatingsTable.enjoymentRating,
				difficultyRating: bossRatingsTable.difficultyRating
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
			.orderBy(desc(bossDeathsInRunTable.deathDate))
			.limit(6)
			.offset((Number(page) - 1) * 5);

		return json(customResponse(200, `Ok`, runs));
	} catch (error) {
		console.error('Error fetching runs:', error);
		return json(customResponse(500, `Internal Server Error ${error}`));
	}
};
