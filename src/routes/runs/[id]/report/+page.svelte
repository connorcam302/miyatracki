<script lang="ts">
	export let data;

	export interface Report {
		id: number;
		name: string;
		bosses: Boss[];
	}

	export interface Boss {
		bossId: number;
		bossName: string;
		dlcId: number | null;
		dlcName: null | string;
		averageDeaths: number;
		deaths: number;
		deathDate: number;
		difficulty: number;
		enjoyment: number;
	}

	export interface RunData {
		runId: number;
		runName: string;
		runDate: number;
		user: User;
		gameId: number;
		gameTitle: string;
		experience: number;
	}

	export interface User {
		id: number;
		username: string;
		profilePicture: string;
	}

	import { goto } from '$app/navigation';
	import IconoirUser from 'virtual:icons/iconoir/user';
	import IconoirGamepad from 'virtual:icons/iconoir/gamepad';
	import IconoirGraphUp from 'virtual:icons/iconoir/graph-up';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import MaterialSymbolsHeartBroken from 'virtual:icons/material-symbols/heart-broken';
	import IconoirClock from 'virtual:icons/iconoir/clock';
	import tippy from 'sveltejs-tippy';
	import { truncateString, getExperienceTitle } from '$lib/functions';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	dayjs.extend(advancedFormat);

	const { runData, reports } = data as { runData: RunData; reports: Report[] };

	const getDeathsColour = (deaths: number, averageDeaths: number) => {
		if (deaths === averageDeaths) return '#d6d3d1';
		if (deaths > averageDeaths) return '#ef4444';
		if (deaths < averageDeaths) return '#22c55e';
	};

	console.log(runData, reports);
</script>

<div>
	<div class="flex flex-col gap-4">
		<div>
			<div class="text-center font-display text-4xl">{runData.runName}</div>
			<div class="text-center text-stone-400 text-lg">Run Report</div>
		</div>
		<div class="flex flex-wrap gap-4 justify-center">
			<button
				on:click={() => goto(`/user/${runData.user.id}`)}
				class="flex gap-1 items-center hover:text-stone-400 duration-200"
			>
				<div><IconoirUser /></div>
				<div>{runData.user.username}</div>
			</button>
			<div class="flex gap-1 items-center">
				<div><IconoirGamepad /></div>
				<div>{runData.gameTitle}</div>
			</div>
			<div class="flex gap-1 items-center">
				<div><IconoirGraphUp /></div>
				<div style="color: {getExperienceTitle(runData.experience).colour}">
					{getExperienceTitle(runData.experience).title}
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-6">
			{#each reports as report}
				<div class="flex flex-col gap-2">
					{#if report.id !== -1}
						<div class="text-2xl font-display text-center">{report.name}</div>
					{/if}
					<table class="text-lg">
						<div class="flex flex-row gap-2 text-sm text-stone-400">
							<div class="w-64 lg:w-96 truncate">Name</div>
							<div class="w-8 flex justify-center"><MaterialSymbolsHeartBroken /></div>
							<div class="w-8 flex justify-center"><IconoirGym /></div>
							<div class="w-8 flex justify-center"><IconoirMagicWand /></div>
							<div class="hidden lg:block">
								<div class="w-48 flex justify-center">
									<IconoirClock />
								</div>
							</div>
						</div>
						{#each report.bosses as boss}
							<div
								class="flex flex-row gap-2 border-t-stone-400 border-t-[1px] border-opacity-30 h-8"
							>
								{#if boss.deaths !== null}
									<button
										class="text-left w-64 lg:w-96 truncate hover:text-stone-400 duration-200"
										on:click={() => goto(`/boss/${boss.bossId}`)}>{boss.bossName}</button
									>
									<div
										class="w-8 text-center"
										style="color: {getDeathsColour(boss.deaths, Math.round(boss.averageDeaths))}"
										use:tippy={{
											content: `<b>${Math.abs(
												boss.deaths - Math.round(boss.averageDeaths)
											)} </b> death${
												Math.abs(boss.deaths - Math.round(boss.averageDeaths)) > 1 ? 's' : ''
											} ${boss.deaths > boss.averageDeaths ? 'above' : 'below'} average.`,
											placement: 'left',
											allowHTML: true
										}}
									>
										{boss.deaths}
									</div>
									<div class="w-8 text-center">{boss.difficulty}</div>
									<div class="w-8 text-center">{boss.enjoyment}</div>
									<div class="hidden lg:block">
										<div class="w-48 text-center">
											{dayjs(boss.deathDate).format('Do MMMM YYYY')}
										</div>
									</div>
								{:else}
									<div class="w-64 lg:w-96 truncate line-through text-stone-400">
										{boss.bossName}
									</div>
									<div class="w-8 text-center text-stone-400">-</div>
									<div class="w-8 text-center text-stone-400">-</div>
									<div class="w-8 text-center text-stone-400">-</div>
								{/if}
							</div>
						{/each}
					</table>
				</div>
			{/each}
		</div>
	</div>
</div>
