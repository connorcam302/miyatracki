import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossesTable,
	bossRatingsTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { avg, count, desc, eq, sql } from 'drizzle-orm';

export const load = async ({ fetch, data, params }) => {
	const [game] = await db.select().from(gamesTable).where(eq(gamesTable.gameId, params.id));

	const bosses = await db
		.select({
			bossId: bossesTable.bossId,
			bossName: bossesTable.bossName,
			bossImage: bossesTable.bossImage,
			enjoymentRating: avg(bossRatingsTable.enjoymentRating),
			difficultyRating: avg(bossRatingsTable.difficultyRating),
			deaths: avg(bossDeathsInRunTable.deathCount),
			combinedRating: sql`((${avg(bossRatingsTable.enjoymentRating)}*0.7) + (${avg(
				bossRatingsTable.difficultyRating
			)}*0.3))*10`,
			ratingCount: count(bossRatingsTable.ratingId)
		})
		.from(bossesTable)
		.leftJoin(bossRatingsTable, eq(bossesTable.bossId, bossRatingsTable.bossId))
		.leftJoin(bossDeathsInRunTable, eq(bossesTable.bossId, bossDeathsInRunTable.bossId))
		.leftJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
		.groupBy(bossesTable.bossId, bossesTable.bossName)
		.where(eq(bossesTable.bossGame, params.id));

	const runsForGame = await db
		.select({
			runId: runsTable.runId,
			runName: runsTable.runName,
			runStartDate: runsTable.runStartDate,
			runEndDate: runsTable.runEndDate,
			runUserId: runsTable.runUser,
			runUserName: userTable.displayName,
			runUserPicture: userTable.profilePicture,
			experience: runsTable.experience,
			gameTitle: gamesTable.gameTitle
		})
		.from(runsTable)
		.innerJoin(gamesTable, eq(runsTable.gameId, gamesTable.gameId))
		.innerJoin(userTable, eq(runsTable.runUser, userTable.id))
		.where(eq(runsTable.gameId, params.id))
		.orderBy(desc(runsTable.runStartDate));

	// Step 2: For each run, get the latest boss kill
	const allRuns = await Promise.all(
		runsForGame.map(async (run) => {
			const latestBossKill = await db
				.select({
					bossId: bossDeathsInRunTable.bossId,
					deathDate: bossDeathsInRunTable.deathDate,
					bossName: bossesTable.bossName,
					bossImage: bossesTable.bossImage
				})
				.from(bossDeathsInRunTable)
				.leftJoin(bossesTable, eq(bossDeathsInRunTable.bossId, bossesTable.bossId))
				.where(eq(bossDeathsInRunTable.runId, run.runId))
				.orderBy(desc(bossDeathsInRunTable.deathDate))
				.limit(1);

			return {
				...run,
				latestBoss: latestBossKill[0]?.bossName || null,
				latestBossId: latestBossKill[0]?.bossId || null,
				latestBossImage: latestBossKill[0]?.bossImage || null
			};
		})
	);

	return { game, bosses, allRuns };
};
