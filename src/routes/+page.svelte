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
	import { getExperienceTitle, truncateString } from '$lib/functions.js';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	interface Run {
		runName: string;
		runId: number;
		experience: number;
		game: number;
		gameName: string;
		userId: number;
		username: string;
		userPicture: string;
		runDate: number;
		bossId: number;
		bossName: string;
		deathTime: number;
		deathCount: number;
		enjoyment: number;
		difficulty: number;
	}

	export let data;
	const { users, runBlocks, pages } = data as { users: any[]; runBlocks: Run[]; pages: Runs[][] };
	$: pageNumber = 0;
	console.log(data);
</script>

<div class="flex flex-wrap gap-4 justify-center">
	<div class="flex flex-col gap-4">
		<div class="text-3xl text-center">Runs</div>
		<div class="flex flex-col gap-2 justify-center">
			{#key pageNumber}
				<div class="flex flex-col gap-2 justify-center" in:fade={{ duration: 500 }}>
					{#each pages[pageNumber] as run, i}
						<div key={i} in:fade={{ duration: 500 }}>
							<button
								on:click={() => goto(`/runs/${run.runId}`)}
								class="rounded-3xl bg-stone-700 py-3 px-4 bg-opacity-[.30] w-[375px]"
							>
								<div class="flex flex-col gap-1 w-full">
									<div class="flex px-2 items-center">
										<div class="text-left text-xl">
											{run.runName}
										</div>
										<div class="grow" />
										<div class="text-right text-lg text-stone-400">
											{dayjs(run.deathTime).fromNow()}
										</div>
									</div>
									<div class="flex">
										<div class="flex flex-col text-sm grow w-56">
											<button
												on:click={() => goto(`/user/${run.userId}`)}
												class="flex gap-1 items-center hover:text-stone-400 duration-200"
											>
												<div><IconoirUser /></div>
												<div>{truncateString(run.username, 20)}</div>
											</button>
											<div class="flex gap-1 items-center">
												<div><IconoirGamepad /></div>
												<div>{truncateString(run.gameName, 20)}</div>
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
												on:click={() => goto(`/boss/${run.bossId}`)}
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
												<div>{run.difficulty} difficulty</div>
											</div>
											<div class="flex gap-1 items-center">
												<div><IconoirMagicWand /></div>
												<div>{run.enjoyment} enjoyment</div>
											</div>
										</div>
									</div>
								</div>
							</button>
						</div>
					{/each}
				</div>
			{/key}
			<div class="flex items-center justify-center gap-4">
				<div class="w-10">
					{#if pageNumber > 0}
						<button
							class="text-xl bg-stone-200 text-black p-2 rounded-full w-fit"
							on:click={() => pageNumber--}
						>
							<IconoirNavArrowLeft />
						</button>
					{:else}
						<div class="text-xl bg-stone-700 text-stone-200 p-2 rounded-full w-fit">
							<IconoirNavArrowLeft />
						</div>
					{/if}
				</div>
				<div class="font-display text-xl w-8 text-center">{pageNumber + 1}</div>
				<div class="w-10">
					{#if pageNumber < pages.length - 1}
						<button
							class="text-xl bg-stone-200 text-black p-2 rounded-full w-fit"
							on:click={() => pageNumber++}
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
