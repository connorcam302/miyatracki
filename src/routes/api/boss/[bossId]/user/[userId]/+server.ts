import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { bossRatingsTable } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';
import { and, eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, params }) => {
	console.log(url.pathname, 'requested.');
	const bossId = Number(params.bossId);
	const userId = Number(params.userId);

	try {
		const dataArray = await db
			.select()
			.from(bossRatingsTable)
			.where(and(eq(bossRatingsTable.bossId, bossId), eq(bossRatingsTable.userId, userId)));

		if (dataArray.length === 0) {
			return json(customResponse(204, 'No data found.', []));
		} else {
			return json(customResponse(200, 'Ok', dataArray));
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return json(customResponse(500, 'Internal Server Error'));
	}
};
