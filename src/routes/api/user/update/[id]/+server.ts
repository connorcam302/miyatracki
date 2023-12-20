import { customResponse } from '$lib/CustomResponse';

import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { userTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ url, params }) => {
	console.log(url.pathname, 'requested.');
	const id = Number(params.id);
	const username = url.searchParams.get('username');

	if (!username) {
		return json(customResponse(400, 'No username provided.'));
	}

	try {
		await db.update(userTable).set({ displayName: username }).where(eq(userTable.id, id));

		return json(customResponse(200, 'Username updated.'));
	} catch (error) {
		return json(customResponse(500, 'Something went wrong.'));
	}
};
