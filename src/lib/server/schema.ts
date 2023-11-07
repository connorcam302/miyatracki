import { sqliteTable, integer, text, numeric, primaryKey } from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from '@auth/core/adapters';

export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image')
});

export const accounts = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId)
	})
);

export const sessions = sqliteTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token)
	})
);

export const games = sqliteTable('games', {
	gameId: integer('game_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	gameTitle: text('game_title').notNull()
});

export const dlc = sqliteTable('dlc', {
	dlcId: integer('dlc_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	dlcTitle: text('dlc_title').notNull(),
	dlcOrder: integer('dlc_order').notNull(),
	dlcGame: integer('dlc_game')
		.notNull()
		.references(() => games.gameId)
});

export const runs = sqliteTable('runs', {
	runId: integer('run_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	gameId: integer('game_id')
		.notNull()
		.references(() => games.gameId),
	runStartDate: numeric('run_start_date').notNull(),
	runEndDate: numeric('run_end_date'),
	isCompleted: numeric('is_completed').notNull(),
	runUser: text('run_user')
		.notNull()
		.references(() => users.id)
});

export const bosses = sqliteTable('bosses', {
	bossId: integer('boss_id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	bossName: text('boss_name').notNull(),
	bossOptional: numeric('boss_optional'),
	bossDLC: numeric('boss_dlc').references(() => dlc.dlcId),
	bossGame: integer('boss_game')
		.notNull()
		.references(() => games.gameId)
});

export const bossDeathsInRun = sqliteTable('bossDeathsInRun', {
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
