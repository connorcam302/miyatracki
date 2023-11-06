import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { users } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';

export const GET: RequestHandler = async ({ url }) => {
	console.log(url.pathname, 'requested.');

	try {
		const userArray = await db.select().from(users);
		if (userArray.length === 0) {
			return json(customResponse(204, 'No users found.', []));
		} else {
			return json(customResponse(200, 'Ok', userArray));
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return json(customResponse(500, 'Internal Server Error'));
	}
};
