import { db } from '$lib/server/database';
import { gamesTable } from '$lib/server/schema';

export const load = async ({ fetch, data }) => {
	const games = await db.select().from(gamesTable);

	return { games };
};
