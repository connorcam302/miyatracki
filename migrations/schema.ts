import { sqliteTable, AnySQLiteColumn, foreignKey, integer, numeric, text, primaryKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const bossDeathsInRun = sqliteTable("BossDeathsInRun", {
	deathId: integer("death_id").primaryKey({ autoIncrement: true }).notNull(),
	runId: integer("run_id").notNull().references(() => oldPushRuns.runId),
	bossId: integer("boss_id").notNull().references(() => bosses.bossId),
	deathCount: integer("death_count").notNull(),
	deathDate: numeric("death_date"),
});

export const bosses = sqliteTable("Bosses", {
	bossId: integer("boss_id").primaryKey({ autoIncrement: true }).notNull(),
	bossName: text("boss_name").notNull(),
	bossOptional: numeric("boss_optional"),
	bossDlc: numeric("boss_dlc").references(() => dlc.dlcId),
	bossGame: integer("boss_game").notNull().references(() => games.gameId),
});

export const dlc = sqliteTable("DLC", {
	dlcId: integer("dlc_id").primaryKey({ autoIncrement: true }).notNull(),
	dlcTitle: text("dlc_title").notNull(),
	dlcOrder: integer("dlc_order").notNull(),
	dlcGame: integer("dlc_game").notNull().references(() => games.gameId),
});

export const games = sqliteTable("Games", {
	gameId: integer("game_id").primaryKey({ autoIncrement: true }).notNull(),
	gameTitle: text("game_title").notNull(),
});

export const runs = sqliteTable("Runs", {
	runId: integer("run_id").primaryKey({ autoIncrement: true }).notNull(),
	gameId: integer("game_id").notNull().references(() => games.gameId),
	runStartDate: numeric("run_start_date").notNull(),
	runEndDate: numeric("run_end_date"),
	isCompleted: numeric("is_completed").notNull(),
	runUser: text("run_user").notNull().references(() => user.id),
});

export const account = sqliteTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: numeric("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		pk0: primaryKey(table.provider, table.providerAccountId)
	}
});

export const session = sqliteTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: integer("expires").notNull(),
});

export const user = sqliteTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: integer("emailVerified"),
	image: text("image"),
});

export const verificationToken = sqliteTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: integer("expires").notNull(),
},
(table) => {
	return {
		pk0: primaryKey(table.identifier, table.token)
	}
});