<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import ParentBox from '$lib/components/ParentBox.svelte';
	import PlusIcon from 'virtual:icons/iconoir/plus-circle-solid';
	import IconoirSearch from 'virtual:icons/iconoir/search';
	import IconoirNavArrowLeft from 'virtual:icons/iconoir/nav-arrow-left';
	import IconoirNavArrowRight from 'virtual:icons/iconoir/nav-arrow-right';
	import IconoirShareAndroid from 'virtual:icons/iconoir/share-android';
	import IconoirUser from 'virtual:icons/iconoir/user';
	import IconoirGamepad from 'virtual:icons/iconoir/gamepad';
	import IconoirGraphUp from 'virtual:icons/iconoir/graph-up';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirBonfire from 'virtual:icons/iconoir/bonfire';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import MaterialSymbolsHeartBroken from 'virtual:icons/material-symbols/heart-broken';
	import ChildBox from '$lib/components/ChildBox.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getExperienceTitle, truncateString } from '$lib/functions.js';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	interface Run {
		runId: number;
		runName: string;
		displayName: string;
		gameTitle: string;
		experience: number;
		bossName: string;
		deathDate: number;
		deathCount: number;
		enjoymentRating: number;
		difficultyRating: number;
	}

	$: pageNumber = 1;
	$: runs = [];

	onMount(() => loadRuns());

	const loadRuns = async () => {
		console.log('requesting page');
		const response = await fetch(`/api/runs/all?page=${pageNumber}`);
		runs = await response.json().then((data: Run) => data.data);
	};

	const incrementPage = () => {
		pageNumber++;
		loadRuns();
	};

	const decrementPage = () => {
		pageNumber--;
		loadRuns();
	};

	$: console.log(runs);
</script>

<div class="flex flex-wrap gap-4 justify-center">
	<div class="flex flex-col gap-4">
		<div class="text-3xl text-center">Runs</div>
		<div class="flex flex-col gap-2 justify-center">
			{#key pageNumber}
				<div class="flex flex-col gap-2 justify-center" in:fade={{ duration: 500 }}>
					{#if runs.length === 0}
						<div class="flex justify-center">
							<div
								class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-stone-200"
							/>
						</div>
					{:else}
						{#each runs.length == 6 ? runs.slice(0, -1) : runs as run, i}
							<div key={i} in:fade={{ duration: 500 }}>
								<button
									on:click={() => goto(`/runs/${run.runId}`)}
									class="rounded-3xl bg-stone-700 py-3 px-4 bg-opacity-[.30] w-[375px]"
								>
									<div class="flex flex-col gap-1 w-full">
										<div class="flex px-2 items-center gap-4">
											<div class="flex-1 text-left text-lg truncate">
												{run.runName}
											</div>
											<div class="flex-none text-right text-lg text-stone-400">
												{dayjs(run.deathDate).fromNow()}
											</div>
										</div>
										<div class="flex">
											<div class="flex flex-col text-sm grow w-56">
												<button
													on:click|stopPropagation={() => goto(`/user/${run.userId}`)}
													class="flex gap-1 items-center hover:text-stone-400 duration-200"
												>
													<div><IconoirUser /></div>
													<div>{truncateString(run.displayName, 20)}</div>
												</button>
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
											<div class="flex flex-col text-sm w-60">
												<button
													on:click|stopPropagation={() => goto(`/boss/${run.bossId}`)}
													class="flex gap-1 items-center hover:text-stone-400 duration-200"
												>
													<div><IconoirBonfire /></div>
													<div>{truncateString(run.bossName, 20)}</div>
												</button>
												<div class="flex gap-1 items-center">
													<div><MaterialSymbolsHeartBroken /></div>
													<div>{run.deathCount} deaths</div>
												</div>
												<div class="flex gap-1 items-center">
													<div><IconoirGym /></div>
													<div>{run.difficultyRating} difficulty</div>
												</div>
												<div class="flex gap-1 items-center">
													<div><IconoirMagicWand /></div>
													<div>{run.enjoymentRating} enjoyment</div>
												</div>
											</div>
										</div>
									</div>
								</button>
							</div>
						{/each}
					{/if}
				</div>
			{/key}
			<div class="flex items-center justify-center gap-4">
				<div class="w-10">
					{#if pageNumber > 0}
						<button
							class="text-xl bg-stone-200 text-black p-2 rounded-full w-fit"
							on:click={() => decrementPage()}
						>
							<IconoirNavArrowLeft />
						</button>
					{:else}
						<div class="text-xl bg-stone-700 text-stone-200 p-2 rounded-full w-fit">
							<IconoirNavArrowLeft />
						</div>
					{/if}
				</div>
				<div class="font-display text-xl w-8 text-center">{pageNumber}</div>
				<div class="w-10">
					{#if pageNumber < runs.length < 6}
						<button
							class="text-xl bg-stone-200 text-black p-2 rounded-full w-fit"
							on:click={() => incrementPage()}
						>
							<IconoirNavArrowRight />
						</button>
					{:else}
						<div class="text-xl bg-stone-700 text-stone-200 p-2 rounded-full w-fit">
							<IconoirNavArrowRight />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
