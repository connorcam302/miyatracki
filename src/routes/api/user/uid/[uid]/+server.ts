import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { userTable } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';
import { eq } from 'drizzle-orm';
import { API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url, params, request }) => {
	console.log(url.pathname, 'requested.');

	const authorizationHeader = request.headers.get('Authorization');
	if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
		return json(customResponse(401, 'Unauthorized'));
	}

	const token = authorizationHeader.split(' ')[1];

	if (token === API_KEY) {
		try {
			const userArray = await db.select().from(userTable).where(eq(userTable.uid, params.uid));
			if (userArray.length === 0) {
				return json(customResponse(204, `No user with uid ${params.uid} found.`, []));
			} else {
				return json(customResponse(200, 'Ok', userArray));
			}
		} catch (error) {
			console.error('Error fetching user:', error);
			return json(customResponse(500, 'Internal Server Error'));
		}
	} else {
		return json(customResponse(401, 'Invalid token'));
	}
};
