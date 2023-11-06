import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('Users', {
	userId: integer('user_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	username: text('username').notNull()
});

export const games = sqliteTable('Games', {
	gameId: integer('game_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	gameTitle: text('game_title').notNull()
});

export const dlc = sqliteTable('DLC', {
	dlcId: integer('dlc_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	dlcTitle: text('dlc_title').notNull(),
	dlcOrder: integer('dlc_order').notNull(),
	dlcGame: integer('dlc_game')
		.notNull()
		.references(() => games.gameId)
});

export const runs = sqliteTable('Runs', {
	runId: integer('run_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	gameId: integer('game_id')
		.notNull()
		.references(() => games.gameId),
	runStartDate: numeric('run_start_date').notNull(),
	runEndDate: numeric('run_end_date'),
	isCompleted: numeric('is_completed').notNull()
});

export const bosses = sqliteTable('Bosses', {
	bossId: integer('boss_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	bossName: text('boss_name').notNull(),
	bossOptional: numeric('boss_optional'),
	bossDLC: numeric('boss_dlc').references(() => dlc.dlcId),
	bossGame: integer('boss_game')
		.notNull()
		.references(() => games.gameId)
});

export const bossDeathsInRun = sqliteTable('BossDeathsInRun', {
	deathId: integer('death_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	runId: integer('run_id')
		.notNull()
		.references(() => runs.runId),
	bossId: integer('boss_id')
		.notNull()
		.references(() => bosses.bossId),
	deathCount: integer('death_count').notNull(),
	deathDate: numeric('death_date')
});
