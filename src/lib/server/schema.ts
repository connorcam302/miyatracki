import { sqliteTable, integer, numeric, text } from 'drizzle-orm/sqlite-core';

export const bossesTable = sqliteTable('Bosses', {
	bossId: integer('boss_id').primaryKey({ autoIncrement: true }).notNull(),
	bossName: text('boss_name').notNull(),
	bossOptional: numeric('boss_optional'),
	bossDlc: numeric('boss_dlc').references(() => dlcTable.dlcId),
	bossGame: integer('boss_game')
		.notNull()
		.references(() => gamesTable.gameId),
	bossImage: text('boss_image')
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

export const userTable = sqliteTable('User', {
	uid: text('uid').notNull(),
	id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
	email: text('email').notNull(),
	displayName: text('display_name').notNull(),
	profilePicture: text('profile_picture')
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
	deathDate: integer('death_date')
});

export const runsTable = sqliteTable('Runs', {
	runId: integer('run_id').primaryKey({ autoIncrement: true }).notNull(),
	gameId: integer('game_id')
		.notNull()
		.references(() => gamesTable.gameId),
	runStartDate: integer('run_start_date').notNull(),
	runEndDate: integer('run_end_date'),
	runUser: integer('run_user')
		.notNull()
		.references(() => userTable.id),
	experience: integer('experience'),
	runName: text('run_name').notNull()
});

export const bossRatingsTable = sqliteTable('BossRatings', {
	ratingId: integer('rating_id').primaryKey({ autoIncrement: true }).notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => userTable.id),
	bossId: integer('boss_id')
		.notNull()
		.references(() => bossesTable.bossId),
	enjoymentRating: integer('enjoyment_rating'),
	difficultyRating: integer('difficulty_rating'),
	timestamp: text('timestamp')
});
