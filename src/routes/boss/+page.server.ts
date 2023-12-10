import { db } from '$lib/server/database';
import { bossesTable, gamesTable } from '$lib/server/schema';

export const load = async ({ fetch, data }) => {
	const games = await db.select().from(gamesTable);
	const bosses = await db.select().from(bossesTable);

	const gameData = games.map((game) => {
		const gameBosses = bosses.filter((boss) => boss.bossGame === game.gameId);
		return { id: game.gameId, name: game.gameTitle, bosses: gameBosses };
	});

	return { gameData };
};
