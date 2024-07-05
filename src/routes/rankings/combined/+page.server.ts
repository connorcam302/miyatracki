import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossesTable,
	bossRatingsTable,
	gamesTable,
	runsTable
} from '$lib/server/schema';
import { avg, count, desc, eq, sql } from 'drizzle-orm';

export const load = async ({ fetch, data, params }) => {
	const games = await db.select().from(gamesTable);

	const bosses = await db
		.select({
			bossId: bossesTable.bossId,
			bossName: bossesTable.bossName,
			bossGame: bossesTable.bossGame,
			avgEnjoymentRating: avg(bossRatingsTable.enjoymentRating),
			avgDifficultyRating: avg(bossRatingsTable.difficultyRating),
			avgDeaths: avg(bossDeathsInRunTable.deathCount),
			combinedAverageRating: sql`${avg(bossRatingsTable.enjoymentRating)} * ${avg(
				bossRatingsTable.difficultyRating
			)}`,
			ratingCount: count(bossRatingsTable.ratingId)
		})
		.from(bossesTable)
		.leftJoin(bossRatingsTable, eq(bossesTable.bossId, bossRatingsTable.bossId))
		.leftJoin(bossDeathsInRunTable, eq(bossesTable.bossId, bossDeathsInRunTable.bossId))
		.leftJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
		.groupBy(bossesTable.bossId, bossesTable.bossName);

	const bossByGame = games.map((game) => {
		return {
			gameName: game.gameTitle,
			bosses: bosses.filter((boss) => boss.bossGame === game.gameId)
		};
	});

	return { bossByGame };
};
