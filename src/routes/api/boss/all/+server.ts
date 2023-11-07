import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { bosses } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';

export const GET: RequestHandler = async ({ url }) => {
	console.log(url.pathname, 'requested.');

	try {
		const dataArray = await db.select().from(bosses);
		if (dataArray.length === 0) {
			return json(customResponse(204, 'No users found.', []));
		} else {
			return json(customResponse(200, 'Ok', dataArray));
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return json(customResponse(500, 'Internal Server Error'));
	}
};
