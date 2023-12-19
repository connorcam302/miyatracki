import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossRatingsTable,
	bossesTable,
	gamesTable,
	runsTable
} from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const { id } = params;

	const getAverageDifficutly = (ratings) => {
		if (ratings.length === 0) {
			return '-';
		}

		const totalEnjoyment = ratings.reduce((sum, rating) => sum + rating.difficultyRating, 0);
		return totalEnjoyment / ratings.length;
	};

	const getAverageEnjoyment = (ratings) => {
		if (ratings.length === 0) {
			return '-';
		}

		const totalEnjoyment = ratings.reduce((sum, rating) => sum + rating.enjoymentRating, 0);
		return totalEnjoyment / ratings.length;
	};

	function getAverageDeathsByExperience(data) {
		// Create an array to store the average death count and count for each experience level
		const averages: object[] = [];

		// Create an object to store the total death count and count for each experience level
		const deathCountByExperience = {
			0: { total: 0, count: 0 },
			1: { total: 0, count: 0 },
			2: { total: 0, count: 0 },
			3: { total: 0, count: 0 }
		};

		// Iterate through the array and update the totals and counts for each experience level
		data.forEach((item) => {
			if (item.BossDeathsInRun.deathDate !== null) {
				const deathCount = item.BossDeathsInRun.deathCount;
				const experience = item.Runs.experience;

				deathCountByExperience[experience].total += deathCount;
				deathCountByExperience[experience].count += 1;
			}
		});

		// Calculate the average death count for each experience level and push into the array
		for (const expLevel in deathCountByExperience) {
			const total = deathCountByExperience[expLevel].total;
			const count = deathCountByExperience[expLevel].count;

			averages.push({
				average: count > 0 ? total / count : 0,
				count: count
			});
		}

		return averages;
	}

	const bossData = await db
		.select()
		.from(bossesTable)
		.where(eq(bossesTable.bossId, id))
		.innerJoin(gamesTable, eq(bossesTable.bossGame, gamesTable.gameId));

	const ratingData = await db
		.select()
		.from(bossRatingsTable)
		.where(eq(bossRatingsTable.bossId, id));

	const deathData = await db
		.select()
		.from(bossDeathsInRunTable)
		.where(eq(bossDeathsInRunTable.bossId, id))
		.innerJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId));

	const boss = {
		...bossData[0].Bosses,
		game: bossData[0].Games.gameTitle
	};

	const rating = {
		difficulty: getAverageDifficutly(ratingData),
		enjoyment: getAverageEnjoyment(ratingData),
		count: ratingData.length
	};

	const deaths = getAverageDeathsByExperience(deathData);

	return { boss, rating, deaths };
};
