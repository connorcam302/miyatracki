-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Users` (
	`user_id` integer PRIMARY KEY,
	`username` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Games` (
	`game_id` integer PRIMARY KEY,
	`user_id` integer NOT NULL,
	`game_title` text NOT NULL,
	`game_platform` text,
	`start_date` numeric,
	`end_date` numeric,
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Runs` (
	`run_id` integer PRIMARY KEY,
	`game_id` integer NOT NULL,
	`run_start_date` numeric NOT NULL,
	`run_end_date` numeric,
	`is_completed` numeric DEFAULT 0 NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `Games`(`game_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Bosses` (
	`boss_id` integer PRIMARY KEY,
	`boss_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `BossDeathsInRun` (
	`death_id` integer PRIMARY KEY,
	`run_id` integer NOT NULL,
	`boss_id` integer NOT NULL,
	`death_count` integer NOT NULL,
	`death_date` numeric,
	`killed_by_user` numeric DEFAULT 0 NOT NULL,
	FOREIGN KEY (`boss_id`) REFERENCES `Bosses`(`boss_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`run_id`) REFERENCES `Runs`(`run_id`) ON UPDATE no action ON DELETE no action
);

*/