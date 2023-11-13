CREATE TABLE `BossDeathsInRun` (
	`death_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`run_id` integer NOT NULL,
	`boss_id` integer NOT NULL,
	`death_count` integer NOT NULL,
	`death_date` numeric,
	FOREIGN KEY (`run_id`) REFERENCES "__old_push_Runs"(`run_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`boss_id`) REFERENCES `Bosses`(`boss_id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `Bosses` (
	`boss_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`boss_name` text NOT NULL,
	`boss_optional` numeric,
	`boss_dlc` numeric,
	`boss_game` integer NOT NULL,
	FOREIGN KEY (`boss_dlc`) REFERENCES `DLC`(`dlc_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`boss_game`) REFERENCES `Games`(`game_id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `DLC` (
	`dlc_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dlc_title` text NOT NULL,
	`dlc_order` integer NOT NULL,
	`dlc_game` integer NOT NULL,
	FOREIGN KEY (`dlc_game`) REFERENCES `Games`(`game_id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `Games` (
	`game_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`game_title` text NOT NULL
);
CREATE TABLE `Runs` (
	`run_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`game_id` integer NOT NULL,
	`run_start_date` numeric NOT NULL,
	`run_end_date` numeric,
	`is_completed` numeric NOT NULL,
	`run_user` text NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `Games`(`game_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`run_user`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`image` text
);
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);