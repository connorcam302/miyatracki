<script>
	import ParentBox from '$lib/components/ParentBox.svelte';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import TierList from '$lib/components/TierList.svelte';
	import RatingCountBarChart from '$lib/components/RatingCountBarChart.svelte';
	import BossScatterGraph from '$lib/components/BossScatterGraph.svelte';
	import IconoirGamepad from 'virtual:icons/iconoir/gamepad';
	import IconoirGraphUp from 'virtual:icons/iconoir/graph-up';
	import { getExperienceTitle, truncateString } from '$lib/functions.ts';
	import gameData from '$lib/data/games.ts';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	export let data;

	let { user, allBosses, games, userRuns, scatterData } = data;
	const { displayName, profilePicture } = user;

	$: bosses = allBosses;
	$: activeGames = games.map((game) => game.gameId);
	const activeGameToggle = (gameId) => {
		activeGames.includes(gameId)
			? (activeGames = activeGames.filter((id) => id !== gameId))
			: (activeGames = [...activeGames, gameId]);

		bosses = allBosses.filter((boss) => activeGames.includes(boss.bossGame));
	};
</script>

<div class="flex flex-col py-2 items-center gap-2">
	<div class="w-full flex justify-center">
		<div class="flex w-full max-w-screen-md items-center py-4">
			<div class="text-6xl font-title">{user.displayName}</div>
			<div class="grow" />
			<div class="">
				<img class="h-32 w-32" src={user.profilePicture} alt="Profile" />
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-y-4">
		<div class="flex flex-wrap justify-center items-center gap-2">
			{#each games as game (game.gameId)}
				<button
					class="border-stone-600 hover:bg-stone-700 duration-200 border-[1px] rounded-lg px-2 py-0.5"
					on:click={() => activeGameToggle(Number(game.gameId))}
					style="background-color: {activeGames.includes(Number(game.gameId))
						? '#F05E1B'
						: ''}; border-color: {activeGames.includes(Number(game.gameId)) ? '#F05E1B' : ''}"
				>
					{game.gameTitle}
				</button>
			{/each}
		</div>
		<div class="flex flex-col items-center border-t-[1px] border-stone-700 gap-4 pt-4">
			<div class="px-2 md:px-4 text-3xl text-center">Runs</div>
			<div class="flex flex-wrap justify-center items-center gap-4">
				{#each userRuns as run, i}
					<button
						on:click={() => goto(`/runs/${run.runId}`)}
						class="text-stone-300 hover:text-stone-100 bg-stone-800 hover:bg-stone-750 rounded-lg p-2 border-stone-600 border-[1px] w-72 flex-shrink-0 duration-200"
						style={run.bossKills / run.totalBossesInGame === 1 ? 'border-color: #F05E1B' : ''}
					>
						<div class="flex flex-col gap-1 w-full">
							<div class="flex items-center gap-4">
								<div class="flex-1 text-left text-lg truncate">
									{run.runName}
								</div>
								<div class="flex-none text-right text-lg text-stone-500">
									{dayjs(run.mostRecentKillDate).fromNow()}
								</div>
							</div>
							<div class="flex">
								<div class="flex flex-col text-sm">
									<div class="flex gap-1 items-center">
										<div><IconoirGamepad /></div>
										<div>{truncateString(run.gameTitle, 20)}</div>
									</div>
									<div class="flex gap-1 items-center">
										<div><IconoirGraphUp /></div>
										<div style="color: {getExperienceTitle(run.experience).colour}">
											{getExperienceTitle(run.experience).title}
										</div>
									</div>
								</div>
								<div class="flex items-center justify-end grow text-xl">
									{run.bossKills} / {run.totalBossesInGame}
								</div>
							</div>
						</div>
					</button>
				{/each}
			</div>
		</div>
		<div class="flex flex-wrap justify-center gap-y-4 gap-x-32">
			<div class="flex flex-col gap-2">
				<div class="px-2 md:px-4 text-3xl">Boss Rankings</div>
				<div
					class="flex flex-col gap-2 text-stone-200 bg-stone-800 rounded-lg p-2 border-stone-600 border-[1px] overflow-auto h-96"
					id="scrollbox"
				>
					<table>
						{#each bosses as boss, i}
							<tr class={`${i !== boss.length ? 'border-b-[1px] border-stone-600' : ''}`}>
								<td class="pr-3 text-right">{i + 1}</td>
								<td class="truncate max-w-72 min-w-72"
									><button
										class="text-left truncate hover:text-stone-400 duration-200"
										on:click={() => goto(`/boss/${boss.bossId}`)}>{boss.bossName}</button
									></td
								>
								<td>{boss.combinedRating.toFixed(0)}</td>
							</tr>
						{/each}
					</table>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="px-2 md:px-4 text-3xl">Rating Counts</div>
				{#key [...bosses]}
					<RatingCountBarChart {bosses} />
				{/key}
			</div>
			<div class="flex flex-col gap-2">
				<div class="px-2 md:px-4 text-3xl">Rating Graph</div>
				{#key [...bosses]}
					<div class="h-96">
						<BossScatterGraph data={scatterData} />
					</div>
				{/key}
			</div>
		</div>
	</div>
	{#key [...bosses]}
		<TierList {bosses} />
	{/key}
</div>

<style>
	#scrollbox {
		float: left;
		overflow-y: scroll;
	}

	#scrollbox::-webkit-scrollbar {
		width: 4px;
	}

	#scrollbox::-webkit-scrollbar-thumb {
		background-color: #e7e5e4;
		border-radius: 64px;
	}
</style>
