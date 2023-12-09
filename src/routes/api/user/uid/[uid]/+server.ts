import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { userTable } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, params }) => {
	console.log(url.pathname, 'requested.');

	try {
		const userArray = await db.select().from(userTable).where(eq(userTable.uid, params.uid));
		if (userArray.length === 0) {
			console.log(customResponse(204, `No user with uid ${params.uid} found.`, []));
			return json(customResponse(204, `No user with uid ${params.uid} found.`, []));
		} else {
			return json(customResponse(200, 'Ok', userArray));
		}
	} catch (error) {
		console.error('Error fetching user:', error);
		return json(customResponse(500, 'Internal Server Error'));
	}
};
