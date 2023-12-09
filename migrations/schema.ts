import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text, numeric } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


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

export const user = sqliteTable("User", {
	uid: text("uid").notNull(),
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	email: text("email").notNull(),
	displayName: text("display_name").notNull(),
	profilePicture: text("profile_picture"),
});

export const bossDeathsInRun = sqliteTable("BossDeathsInRun", {
	deathId: integer("death_id").primaryKey({ autoIncrement: true }).notNull(),
	runId: integer("run_id").notNull().references(() => runs.runId),
	bossId: integer("boss_id").notNull().references(() => bosses.bossId),
	deathCount: integer("death_count").notNull(),
	deathDate: numeric("death_date"),
});

export const runs = sqliteTable("Runs", {
	runId: integer("run_id").primaryKey({ autoIncrement: true }).notNull(),
	gameId: integer("game_id").notNull().references(() => games.gameId),
	runStartDate: integer("run_start_date").notNull(),
	runEndDate: integer("run_end_date"),
	runUser: text("run_user").notNull().references(() => user.id),
	experience: integer("experience").notNull(),
	runName: numeric("run_name").notNull(),
});