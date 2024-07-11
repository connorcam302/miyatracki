import { db } from '$lib/server/database';
import {
	bossDeathsInRunTable,
	bossRatingsTable,
	bossesTable,
	gamesTable,
	runsTable,
	userTable
} from '$lib/server/schema';
import { and, avg, count, desc, eq, max, ne, sql, or } from 'drizzle-orm';
import { getDateString } from '$lib/functions';
import gamesList from '$lib/data/games';

export const load = async ({ fetch, data, params }) => {
	const { id } = params;
	const userData = await db.select().from(userTable).where(eq(userTable.id, id));
	const user = userData[0];

	const userRuns = await db
		.select({
			runId: runsTable.runId,
			runName: runsTable.runName,
			runStartDate: runsTable.runStartDate,
			runEndDate: runsTable.runEndDate,
			experience: runsTable.experience,
			bossKills: count(bossDeathsInRunTable.deathId),
			mostRecentKillDate: max(bossDeathsInRunTable.deathDate),
			totalBossesInGame: sql`(SELECT COUNT(*) FROM ${bossesTable} WHERE ${bossesTable.bossGame} = ${runsTable.gameId})`,
			gameTitle: gamesTable.gameTitle
		})
		.from(runsTable)
		.leftJoin(bossDeathsInRunTable, eq(runsTable.runId, bossDeathsInRunTable.runId))
		.leftJoin(gamesTable, eq(runsTable.gameId, gamesTable.gameId))
		.where(eq(runsTable.runUser, id))
		.groupBy(
			runsTable.runId,
			runsTable.runName,
			runsTable.runStartDate,
			runsTable.runEndDate,
			runsTable.experience,
			runsTable.gameId,
			gamesTable.gameTitle
		)
		.orderBy(desc(runsTable.runStartDate));

	const allBosses = await db
		.select({
			bossId: bossesTable.bossId,
			bossName: bossesTable.bossName,
			bossGame: bossesTable.bossGame,
			bossImage: bossesTable.bossImage,
			enjoymentRating: bossRatingsTable.enjoymentRating,
			difficultyRating: bossRatingsTable.difficultyRating,
			deaths: sql`AVG(${bossDeathsInRunTable.deathCount})`,
			combinedRating: sql`(
      (${bossRatingsTable.enjoymentRating} * 0.7) + 
      (${bossRatingsTable.difficultyRating} * 0.3)
    ) * 10`,
			killCount: sql`COUNT(${bossDeathsInRunTable.bossId})`
		})
		.from(bossesTable)
		.leftJoin(bossRatingsTable, eq(bossesTable.bossId, bossRatingsTable.bossId))
		.leftJoin(bossDeathsInRunTable, eq(bossesTable.bossId, bossDeathsInRunTable.bossId))
		.leftJoin(runsTable, eq(bossDeathsInRunTable.runId, runsTable.runId))
		.where(eq(bossRatingsTable.userId, id))
		.groupBy(
			bossesTable.bossId,
			bossesTable.bossName,
			bossesTable.bossGame,
			bossesTable.bossImage,
			bossRatingsTable.enjoymentRating,
			bossRatingsTable.difficultyRating
		)
		.orderBy(
			desc(
				sql`(
        (AVG(${bossRatingsTable.enjoymentRating}) * 0.7) + 
        (AVG(${bossRatingsTable.difficultyRating}) * 0.3)
      ) * 10`
			)
		);

	console.log(allBosses);

	const gameIds = [...new Set(allBosses.map((obj) => obj.bossGame))];
	const games = gamesList.filter((game) => gameIds.includes(game.gameId));

	const scatterData = games.map((game) => {
		const gameBosses = allBosses.filter((boss) => boss.bossGame === game.gameId);
		return {
			gameName: game.gameTitle,
			bosses: gameBosses
		};
	});

	return { user, userRuns, allBosses, games, scatterData };
};
