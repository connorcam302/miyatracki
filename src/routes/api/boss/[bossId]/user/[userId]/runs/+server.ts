import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { bossDeathsInRunTable, bossRatingsTable, runsTable } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';
import { and, eq } from 'drizzle-orm';
import { getDateString } from '$lib/functions';

export const GET: RequestHandler = async ({ url, params }) => {
	console.log(url.pathname, 'requested.');
	const bossId = Number(params.bossId);
	const userId = Number(params.userId);

	try {
		const dataArray = await db
			.select()
			.from(runsTable)
			.leftJoin(bossDeathsInRunTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
			.where(and(eq(runsTable.runUser, userId), eq(bossDeathsInRunTable.bossId, bossId)));

		if (dataArray.length === 0) {
			return json(customResponse(204, 'No data found.', []));
		} else {
			const data = dataArray.map((item) => {
				return {
					...item.Runs,
					...item.BossDeathsInRun,
					runTimeString: getDateString(item.Runs.runStartDate)
				};
			});
			return json(customResponse(200, 'Ok', data));
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return json(customResponse(500, 'Internal Server Error'));
	}
};
