import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossRatingsTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { avg, count, desc, eq, sql } from 'drizzle-orm';

export const load = async ({ params }) => {
	const { id } = params;

	const [boss] = await db
		.select({
			bossId: bossesTable.bossId,
			bossName: bossesTable.bossName,
			bossGame: bossesTable.bossGame,
			bossImage: bossesTable.bossImage,
			enjoymentRating: avg(bossRatingsTable.enjoymentRating),
			difficultyRating: avg(bossRatingsTable.difficultyRating),
			avgDeaths: avg(bossDeathsInRunTable.deathCount),
			combinedRating: sql`((${avg(bossRatingsTable.enjoymentRating)}*0.7) + (${avg(
				bossRatingsTable.difficultyRating
			)}*0.3))*10`,
			killCount: count(bossDeathsInRunTable.deathDate)
		})
		.from(bossesTable)
		.leftJoin(bossRatingsTable, eq(bossesTable.bossId, bossRatingsTable.bossId))
		.leftJoin(bossDeathsInRunTable, eq(bossesTable.bossId, bossDeathsInRunTable.bossId))
		.where(eq(bossesTable.bossId, id));

	const bossRuns = await db
		.select({
			id: bossDeathsInRunTable.runId,
			name: runsTable.runName,
			experience: runsTable.experience,
			date: bossDeathsInRunTable.deathDate,
			deaths: bossDeathsInRunTable.deathCount,
			userId: runsTable.runUser,
			userDisplayName: userTable.displayName,
			userProfilePicture: userTable.profilePicture
		})
		.from(bossDeathsInRunTable)
		.leftJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
		.leftJoin(userTable, eq(runsTable.runUser, userTable.id))
		.where(eq(bossDeathsInRunTable.bossId, id))
		.orderBy(bossDeathsInRunTable.deathCount);

	return { boss, bossRuns };
};
