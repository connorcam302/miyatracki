import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { bossDeathsInRunTable, bossRatingsTable, runsTable, userTable } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';
import { and, eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, params }) => {
	console.log(url.pathname, 'requested.');
	const bossId = Number(params.bossId);

	try {
		const runs = await db
			.select({
				id: bossDeathsInRunTable.runId,
				name: runsTable.runName,
				deaths: bossDeathsInRunTable.deathCount,
				userId: userTable.id
			})
			.from(bossDeathsInRunTable)
			.innerJoin(runsTable, and(eq(runsTable.runId, bossDeathsInRunTable.runId)))
			.innerJoin(userTable, and(eq(userTable.id, runsTable.runUser)))
			.where(eq(bossDeathsInRunTable.bossId, bossId))
			.orderBy(bossDeathsInRunTable.deathCount);

		return json(customResponse(200, 'Success', runs));
	} catch (error) {
		console.error('Error fetching users:', error);
		return json(customResponse(500, 'Internal Server Error'));
	}
};
