import { db } from '$lib/server/database';
import { userTable } from '$lib/server/schema';

export const load = async ({ fetch, data, params }) => {
	const users = await db.select().from(userTable);

	return { users };
};
