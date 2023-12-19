import { db } from '$lib/server/database';
import {
	bossRatingsTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ fetch, data, params }) => {
	const { id } = params;
	console.log('id', id);

	const userData = await db.select().from(userTable).where(eq(userTable.id, id));
	const runData = await db
		.select()
		.from(runsTable)
		.where(eq(runsTable.runUser, id))
		.innerJoin(gamesTable, eq(runsTable.gameId, gamesTable.gameId));
	const ratingData = await db
		.select()
		.from(bossRatingsTable)
		.where(eq(bossRatingsTable.userId, id))
		.innerJoin(bossesTable, eq(bossRatingsTable.bossId, bossesTable.bossId));

	const user = userData[0];
	const runs = runData.map((run) => {
		return {
			...run.Runs,
			game: run.Games.gameTitle
		};
	});

	const ratings = ratingData.map((rating) => {
		return {
			...rating,
			boss: rating.Bosses.bossName,
			bossImage: rating.Bosses.bossImage
		};
	});

	return { user, runs, ratings };
};
