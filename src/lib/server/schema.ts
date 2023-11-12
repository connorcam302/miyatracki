import { sqliteTable, integer, numeric, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('User', {
	uid: text('uid').notNull(),
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	email: text('email').notNull(),
	displayName: text('display_name').notNull()
});

export const bossDeathsInRunTable = sqliteTable('BossDeathsInRun', {
	deathId: integer('death_id').primaryKey({ autoIncrement: true }).notNull(),
	runId: integer('run_id')
		.notNull()
		.references(() => runsTable.runId),
	bossId: integer('boss_id')
		.notNull()
		.references(() => bossesTable.bossId),
	deathCount: integer('death_count').notNull(),
	deathDate: numeric('death_date')
});

export const bossesTable = sqliteTable('Bosses', {
	bossId: integer('boss_id').primaryKey({ autoIncrement: true }).notNull(),
	bossName: text('boss_name').notNull(),
	bossOptional: numeric('boss_optional'),
	bossDlc: numeric('boss_dlc').references(() => dlcTable.dlcId),
	bossGame: integer('boss_game')
		.notNull()
		.references(() => gamesTable.gameId)
});

export const dlcTable = sqliteTable('DLC', {
	dlcId: integer('dlc_id').primaryKey({ autoIncrement: true }).notNull(),
	dlcTitle: text('dlc_title').notNull(),
	dlcOrder: integer('dlc_order').notNull(),
	dlcGame: integer('dlc_game')
		.notNull()
		.references(() => gamesTable.gameId)
});

export const gamesTable = sqliteTable('Games', {
	gameId: integer('game_id').primaryKey({ autoIncrement: true }).notNull(),
	gameTitle: text('game_title').notNull()
});

export const runsTable = sqliteTable('Runs', {
	runId: integer('run_id').primaryKey({ autoIncrement: true }).notNull(),
	gameId: integer('game_id')
		.notNull()
		.references(() => gamesTable.gameId),
	runStartDate: numeric('run_start_date').notNull(),
	runEndDate: numeric('run_end_date'),
	isCompleted: numeric('is_completed').notNull(),
	runUser: text('run_user')
		.notNull()
		.references(() => userTable.id)
});
