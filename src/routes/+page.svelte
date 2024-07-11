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
	import { fly } from 'svelte/transition';
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

	export let data;
	const { userData, bossRankings, bossDeaths, games } = data;
	console.log(data);

	$: pageNumber = 1;
	const limit = 5;
	$: runs = [];
	$: userRuns = [];

	onMount(() => loadUpdates() && loadUserRuns());

	const loadUserRuns = async () => {
		const response = await fetch(`/api/runs/user/${userData.id}`).then((res) => res.json());
		userRuns = response.data;
	};

	const loadUpdates = async () => {
		const response = await fetch(`/api/runs/all?page=${pageNumber}&limit=${limit}`);
		runs = await response.json().then((data: Run) => data.data);
	};

	const incrementPage = () => {
		pageNumber++;
		loadUpdates();
	};

	const decrementPage = () => {
		pageNumber--;
		loadUpdates();
	};

	const experienceDescription = new Map();
	experienceDescription.set(0, 'Your first playthrough of any souls-like game.');
	experienceDescription.set(1, 'Your first playthrough of this game.');
	experienceDescription.set(2, 'You have played this game once before.');
	experienceDescription.set(3, 'You have played this game multiple times before.');

	let nameValue;
	let experienceValue = 0;
	let gameValue = 'Select a Game';
	let error = '';

	const handleSubmit = async () => {
		if (
			nameValue === undefined ||
			nameValue === null ||
			nameValue.length < 3 ||
			nameValue.length > 50
		) {
			error = 'Please enter a name between 3 and 50 characters.';
			return;
		}
		if (gameValue === 'Select a Game') {
			error = 'Please select a game.';
			return;
		}
		if (userData === null || userData.id === null || userData.id === undefined) {
			error = 'Please log in to create a run.';
			return;
		}
		error = '';
		const formData = {
			id: userData.id,
			name: nameValue,
			game: gameValue,
			experience: experienceValue
		};

		const data = Object.keys(formData)
			.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
			.join('&');

		fetch(`/api/runs/new?${data}`, {
			method: 'POST'
		})
			.then((res) => {
				if (res.status === 200) {
					res.json().then((data) => {
						goto(`/runs/${data.data[0][0].runId}`);
					});
				}
			})
			.catch((err) => {
				error = 'error';
				console.log(err);
			});
	};

	let visible = false;
	function toggleVisible() {
		visible = !visible;
	}
</script>

<div class="flex flex-col gap-4 mx-auto">
	<div class="py-4 flex flex-col gap-4 px-4 items-center">
		<div class="px-2 md:px-4 flex gap-4 w-full items-center">
			<div class="text-3xl">Your Runs</div>
		</div>
		<div class="flex flex-wrap gap-4 justify-center items-center">
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
			<button
				on:click={() => toggleVisible()}
				class="text-2xl rounded-lg hover:bg-ember hover:border-ember border-[1px] border-stone-600 py-1 px-4 duration-200"
				>New Run</button
			>
		</div>
	</div>
	<div class="flex flex-wrap gap-4 md:gap-8 justify-center">
		<div class="flex flex-col gap-4 px-2 md:px-4 max-w-96">
			<div class="px-2 md:px-4 text-3xl">Updates</div>
			<div class="flex flex-col gap-2 justify-center">
				{#key pageNumber}
					<div class="flex flex-col gap-2 justify-center" in:fade={{ duration: 500 }}>
						{#if runs.length === 0}
							<div class="flex justify-center">
								<div
									class="animate-spin rounded-full h-32 w-32 border-t-[1px] border-b-[1px] border-stone-200"
								/>
							</div>
						{:else}
							<div
								class="flex flex-col gap-4 justify-center md:justify-start w-full overflow-hidden"
							>
								{#each runs.length == limit + 1 ? runs.slice(0, -1) : runs as run, i}
									{#key run.runId + run.bossName}
										<div key={i} in:fade={{ duration: 300, delay: i * 80 - 40 }}>
											<button
												on:click={() => goto(`/runs/${run.runId}`)}
												class="text-stone-300 hover:text-stone-100 bg-stone-800 hover:bg-stone-750 rounded-lg p-2 border-stone-600 border-[1px] transition-200 w-80"
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
													<div class="flex flex-row gap-2">
														<div
															class="flex flex-col text-sm justify-center flex-grow overflow-hidden"
														>
															<button
																on:click|stopPropagation={() => goto(`/boss/${run.bossId}`)}
																class="flex gap-1 items-center hover:text-stone-400 duration-200 overflow-hidden"
															>
																<div><IconoirBonfire /></div>
																<div class="truncate">{run.bossName}</div>
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
														<div class="flex justify-end h-24 w-24 flex-shrink-0">
															<img
																src={run.bossImage}
																alt={run.bossName}
																class="object-cover border-[1px] border-stone-600"
															/>
														</div>
													</div>
													<div class="flex flex-row text-xs w-full">
														<button
															on:click|stopPropagation={() => goto(`/user/${run.userId}`)}
															class="flex gap-1 items-center hover:text-stone-400 duration-200 basis-1/3 truncate justify-start grow w-full"
														>
															<div class="text-stone-200"><IconoirUser /></div>
															<div class=" text-stone-400">
																{truncateString(run.displayName, 20)}
															</div>
														</button>
														<div
															class="flex gap-1 items-center basis-1/3 justify-center grow w-full"
														>
															<div class="text-stone-200"><IconoirGamepad /></div>
															<div class=" text-stone-400">{truncateString(run.gameTitle, 20)}</div>
														</div>
														<div class="flex gap-1 items-center basis-1/3 justify-end grow w-full">
															<div class="text-stone-200"><IconoirGraphUp /></div>
															<div
																class=" text-stone-400"
																style="color: {getExperienceTitle(run.experience).colour}"
															>
																{getExperienceTitle(run.experience).title}
															</div>
														</div>
													</div>
												</div>
											</button>
										</div>
									{/key}
								{/each}
							</div>
						{/if}
					</div>
				{/key}
				<div class="flex items-center justify-center gap-4">
					<div class="w-10">
						{#if pageNumber !== 1}
							<button
								class="text-xl bg-stone-200 text-black p-2 rounded-lg w-fit"
								on:click={() => decrementPage()}
							>
								<IconoirNavArrowLeft />
							</button>
						{:else}
							<div class="text-xl bg-stone-700 text-stone-200 p-2 rounded-lg w-fit">
								<IconoirNavArrowLeft />
							</div>
						{/if}
					</div>
					<div class="font-display text-xl w-8 text-center">{pageNumber}</div>
					<div class="w-10">
						{#if pageNumber < runs.length < 6}
							<button
								class="text-xl bg-stone-200 text-black p-2 rounded-lg w-fit"
								on:click={() => incrementPage()}
							>
								<IconoirNavArrowRight />
							</button>
						{:else}
							<div class="text-xl bg-stone-700 text-stone-200 p-2 rounded-lg w-fit">
								<IconoirNavArrowRight />
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-4 px-2 md:px-4">
			<div class="px-2 md:px-4 text-3xl">Boss Rankings</div>
			<div
				class="flex flex-col gap-2 justify-center text-stone-200 bg-stone-800 rounded-lg p-2 border-stone-600 border-[1px]"
			>
				<table>
					{#each bossRankings as boss, i}
						<tr class={`${i !== 31 ? 'border-b-[1px] border-stone-600' : ''}`}>
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
		<div class="flex flex-col gap-4 px-2 md:px-4">
			<div class="px-4 md:px-4 text-3xl">Deaths</div>
			<div
				class="flex flex-col gap-2 justify-center text-stone-200 bg-stone-800 rounded-lg p-2 border-stone-600 border-[1px]"
			>
				<table>
					{#each bossDeaths as boss, i}
						<tr class={`${i !== 31 ? 'border-b-[1px] border-stone-600' : ''}`}>
							<td class="pr-3 text-right">{i + 1}</td>
							<td class="w-64 overflow-hidden flex px-2 pr-3">
								<button
									class="text-left truncate hover:text-stone-400 duration-200"
									on:click={() => goto(`/boss/${boss.bossId}`)}>{boss.bossName}</button
								></td
							>
							<td>{Number(boss.deaths).toFixed(0)}</td>
						</tr>
					{/each}
				</table>
			</div>
		</div>
	</div>
</div>

{#if visible}
	<div
		transition:fade={{ duration: 200 }}
		id="backdrop"
		class="h-screen fixed z-30 top-0 w-screen cursor-default"
		on:click|self={toggleVisible}
		on:keypress={(e) => e.key === 'Escape' && toggleVisible()}
		tabindex="0"
		role="button"
	>
		<div
			transition:fly={{ x: 1000, duration: 1000 }}
			class="absolute z-30 opacity-100 inset-y-0 right-0 w-72 bg-stone-900 p-4 text-stone-200 rounded-l-xl py-8 px-4"
		>
			<form class="flex flex-col gap-3 items-center" on:submit|preventDefault={handleSubmit}>
				<div class="flex flex-col">
					<label for="runName" class="text-sm opacity-60">Run Name</label>
					<div
						class="bg-stone-900 border-stone-600 border-[1px] flex gap-2 items-center rounded-lg px-2 grow text-xl max-w-screen-sm h-10 w-64"
					>
						<input
							id="runName"
							class="bg-stone-900 w-full"
							name="name"
							type="text"
							bind:value={nameValue}
						/>
					</div>
				</div>
				<div class="flex flex-col">
					<label for="gameDropdown" class="text-sm opacity-60">Game</label>
					<div class="bg-stone-900 border-stone-600 border-[1px] rounded-lg pl-1 w-64">
						<select
							id="gameDropdown"
							class="bg-stone-900 w-full rounded-lg h-10"
							bind:value={gameValue}
						>
							<option selected="true" disabled="disabled">Select a Game</option>
							{#each games as game}
								<option value={game.gameId}>{game.gameTitle}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="flex flex-col gap-1">
					<label for="experience" class="text-sm opacity-60">Experience Level</label>
					<input
						type="range"
						class="accent-ember"
						id="experience"
						min="0"
						max={experienceDescription.size - 1}
						bind:value={experienceValue}
					/>
					<div class="text-center">{experienceDescription.get(experienceValue)}</div>
				</div>
				{#key error}
					<div class="h-5 text-red-500 text-center">
						{error}
					</div>
				{/key}
				<button
					class="rounded-lg hover:bg-ember hover:border-ember border-[1px] border-stone-600 py-1 w-32 duration-200"
					>Start</button
				>
			</form>
		</div>
	</div>
{/if}

<style>
	#backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	select {
		border-right: 8px solid transparent;
	}
</style>
