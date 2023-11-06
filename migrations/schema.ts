import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('Users', {
	userId: integer('user_id').primaryKey(),
	username: text('username').notNull()
});

export const games = sqliteTable('Games', {
	gameId: integer('game_id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.userId),
	gameTitle: text('game_title').notNull(),
	gamePlatform: text('game_platform'),
	startDate: numeric('start_date'),
	endDate: numeric('end_date')
});

export const runs = sqliteTable('Runs', {
	runId: integer('run_id').primaryKey(),
	gameId: integer('game_id')
		.notNull()
		.references(() => games.gameId),
	runStartDate: numeric('run_start_date').notNull(),
	runEndDate: numeric('run_end_date'),
	isCompleted: numeric('is_completed').notNull()
});

export const bosses = sqliteTable('Bosses', {
	bossId: integer('boss_id').primaryKey(),
	bossName: text('boss_name').notNull()
});

export const bossDeathsInRun = sqliteTable('BossDeathsInRun', {
	deathId: integer('death_id').primaryKey(),
	runId: integer('run_id')
		.notNull()
		.references(() => runs.runId),
	bossId: integer('boss_id')
		.notNull()
		.references(() => bosses.bossId),
	deathCount: integer('death_count').notNull(),
	deathDate: numeric('death_date'),
	killedByUser: numeric('killed_by_user').notNull()
});
