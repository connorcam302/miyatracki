import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossRatingsTable,
	bossesTable,
	gamesTable,
	runsTable
} from '$lib/server/schema';
import { avg, count, eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const { id } = params;

	const bossData = await db
		.select()
		.from(bossesTable)
		.where(eq(bossesTable.bossId, id))
		.innerJoin(gamesTable, eq(bossesTable.bossGame, gamesTable.gameId));
	// get average ratings for the boss
	const ratingData = await db
		.select({
			averageDifficulty: avg(bossRatingsTable.difficultyRating),
			averageEnjoyment: avg(bossRatingsTable.enjoymentRating),
			count: count(bossRatingsTable.difficultyRating)
		})
		.from(bossRatingsTable)
		.where(eq(bossRatingsTable.bossId, id))
		.groupBy(bossRatingsTable.bossId);

	const deathData = await db
		.select({
			averageDeaths: avg(bossDeathsInRunTable.deathCount),
			experience: runsTable.experience,
			count: count(bossDeathsInRunTable.deathCount)
		})
		.from(bossDeathsInRunTable)
		.where(eq(bossDeathsInRunTable.bossId, id))
		.innerJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
		.groupBy(runsTable.experience);

	const boss = {
		...bossData[0].Bosses,
		game: bossData[0].Games.gameTitle
	};

	const rating = {
		difficulty: ratingData.length > 0 ? ratingData[0].averageDifficulty : '-',
		enjoyment: ratingData.length > 0 ? ratingData[0].averageEnjoyment : '-',
		count: ratingData.length > 0 ? ratingData[0].count : 0
	};

	const deaths = [];

	for (let i = 0; i < 4; i++) {
		const experience = deathData.find((data) => data.experience === i);
		if (experience) {
			deaths[i] = {
				average: experience.averageDeaths,
				count: experience.count
			};
		} else {
			deaths[i] = {
				average: 0,
				count: 0
			};
		}
	}

	return { boss, rating, deaths };
};
