<script lang="ts">
	import { getExperienceTitle } from '$lib/functions';
	import IconoirBonfire from 'virtual:icons/iconoir/bonfire';
	import IconoirUser from 'virtual:icons/iconoir/user';
	import IconoirGraphUp from 'virtual:icons/iconoir/graph-up';
	import IconoirClock from 'virtual:icons/iconoir/clock';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	type Run = {
		runId: number;
		runName: string;
		runStartDate: number;
		runEndDate: null;
		runUserId: number;
		runUserName: string;
		runUserPicture: string;
		experience: number;
		gameTitle: string;
		latestBoss: string;
		latestBossId: number;
		latestBossImage: string;
	};

	const handleError = (ev) => (ev.target.src = '/fallback-pfp.webp');

	export let runs: Run[] = [];
</script>

<div class="px-4">
	{#if runs.length === 0}
		<div class="text-2xl">No runs found</div>
	{:else}
		<div class="flex flex-col justify-between items-center gap-4">
			{#each runs as run}
				<button
					class="flex items-center md:w-full w-96 text-stone-300 hover:text-stone-100 bg-stone-800 hover:bg-stone-750 rounded-lg p-2 border-stone-600 border-[1px] duration-200 max-w-screen-sm"
					on:click={() => goto('/runs/' + run.runId)}
				>
					<div class="flex flex-col text-left gap-0.5">
						<div class="text-2xl truncate w-60 md:w-96">{run.runName}</div>
						<button
							on:click|stopPropagation={() => goto(`/user/${run.runUserId}`)}
							class="flex gap-1 items-center hover:text-stone-400 duration-200 overflow-hidden"
						>
							<IconoirUser />
							<div class="text-lg">{run.runUserName}</div>
						</button>
						<div class="flex gap-1 items-center">
							<IconoirGraphUp />
							<div style="color: {getExperienceTitle(run.experience).colour}">
								{getExperienceTitle(run.experience).title}
							</div>
						</div>
						<button
							on:click|stopPropagation={() => goto(`/boss/${run.latestBossId}`)}
							class="flex gap-1 items-center hover:text-stone-400 duration-200 overflow-hidden"
						>
							<IconoirBonfire />
							<div>{run.latestBoss}</div>
						</button>
						<div class="flex gap-1 items-center">
							<IconoirClock />
							<div>{dayjs(run.runStartDate).fromNow()}</div>
						</div>
					</div>
					<div class="grow" />
					<button on:click|stopPropagation={() => goto(`/user/${run.runUserId}`)}>
						<img
							src={run.runUserPicture}
							alt={run.latestBoss}
							class="w-32 h-32"
							referrerPolicy="no-referrer"
							on:error={handleError}
						/>
					</button>
				</button>
			{/each}
		</div>
	{/if}
</div>
