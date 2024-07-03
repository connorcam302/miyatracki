<script lang="ts">
	export let data;
	import ParentBox from '$lib/components/ParentBox.svelte';
	import IconoirSearch from 'virtual:icons/iconoir/search';
	import IconoirCheck from 'virtual:icons/iconoir/check';
	import IconoirShareAndroid from 'virtual:icons/iconoir/share-android';
	import IconoirUser from 'virtual:icons/iconoir/user';
	import IconoirGamepad from 'virtual:icons/iconoir/gamepad';
	import IconoirClock from 'virtual:icons/iconoir/clock';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import MaterialSymbolsHeartBroken from 'virtual:icons/material-symbols/heart-broken';
	import LetsIconsExpandLeft from '~icons/lets-icons/expand-left';
	import LetsIconsExpandRight from '~icons/lets-icons/expand-right';
	import IconoirXmark from 'virtual:icons/iconoir/xmark';
	import IconoirCircle from 'virtual:icons/iconoir/circle';
	import IconoirCheckCircle from 'virtual:icons/iconoir/check-circle';
	import IconoirMoreHorizCircle from '~icons/iconoir/more-horiz-circle';

	import IconoirGraphUp from 'virtual:icons/iconoir/graph-up';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import tippy from 'sveltejs-tippy';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	dayjs.extend(advancedFormat);
	import { fade, fly } from 'svelte/transition';
	import { getTimeSinceEpoch, getDateString, getExperienceTitle } from '$lib/functions';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getContext, onMount } from 'svelte';

	const { run, bosses, user, userData } = data;
	$: viewport = getContext('viewport');
	let bossList = bosses;
	let urlBoss = Number($page.url.searchParams.get('boss'));

	$: runReport = null;
	onMount(() => {
		loadRunReport();
	});

	$: console.log(runReport);

	$: runData = null;
	$: reports = null;
	const loadRunReport = async () => {
		const response = await fetch(`/api/runs/${run.id}`);
		if (response.status === 200) {
			const runResponse = await response.json();
			runReport = runResponse.data[0];
			runData = runReport.runData;
			reports = runReport.reports;
		} else {
			console.log('something went wrong');
			console.log(await response.json());
		}
	};

	let currentBoss = bossList[0];
	if (urlBoss) {
		const searchBoss = bossList.find((boss) => boss.id === urlBoss);
		if (searchBoss === undefined) {
			currentBoss = bossList[0];
		} else {
			currentBoss = searchBoss;
		}
	}

	let searchBoss = '';
	const searchBossesByName = (allBosses, searchString) => {
		const lowerSearchString = searchString.toLowerCase();

		return allBosses.filter((boss) => boss.name.toLowerCase().includes(lowerSearchString));
	};

	const setAuth = (userId, runId) => {
		if (userId === runId) {
			return true;
		} else {
			return false;
		}
	};

	const auth = setAuth(user.id, userData?.id ?? null);

	let direction = '1';

	const setBoss = (boss) => {
		runReportOpen = false;
		if (boss.id > currentBoss.id) {
			direction = '1';
		} else {
			direction = '-1';
		}
		bossListOpen = false;

		currentBoss = boss;
		$page.url.searchParams.set('boss', boss.id);
		goto(`?${$page.url.searchParams.toString()}`);
	};

	let copyState = 'normal';
	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
		copyState = 'copied';

		setTimeout(() => {
			copyState = 'normal';
		}, 2000);
	};

	const addDeath = async (boss) => {
		const bossIndex = bossList.indexOf(boss);
		const response = await fetch(`/api/runs/${run.id}/boss/${boss.id}/add`, {
			method: 'POST'
		});
		if (response.status === 200) {
			bossList[bossIndex].deaths++;
			currentBoss = bossList[bossIndex];
		} else {
			console.log('something went wrong');
			console.log(await response.json());
		}
	};

	const removeDeath = async (boss) => {
		const bossIndex = bossList.indexOf(boss);
		if (bossList[bossIndex].deaths === 0) return;
		const response = await fetch(`/api/runs/${run.id}/boss/${boss.id}/remove`, {
			method: 'POST'
		});
		if (response.status === 200) {
			bossList[bossIndex].deaths--;
			currentBoss = bossList[bossIndex];
		} else {
			console.log('something went wrong');
			console.log(await response.json());
		}
	};

	const killBoss = async (boss) => {
		const bossIndex = bossList.indexOf(boss);
		const response = await fetch(`/api/runs/${run.id}/boss/${boss.id}/kill`, {
			method: 'POST'
		});
		if (response.status === 200) {
			toggleRatingModal();

			bossList[bossIndex].deathDate = Date.now();
			bossList[bossIndex].deathTimeSince = getTimeSinceEpoch(Date.now());
			bossList[bossIndex].deathDateString = getDateString(Date.now());
			currentBoss = bossList[bossIndex];
		} else {
			console.log('something went wrong');
			console.log(await response.json());
		}
	};

	const getLatestBoss = () => {
		// Check if all timestamps are null
		const allTimestampsNull = bosses.every((boss) => boss.deathDate === null);

		if (allTimestampsNull) {
			return { name: 'No Bosses Killed' };
		}

		// If not all timestamps are null, find the boss with the latest death date
		const bossWithLatestDeathDate = bosses.reduce((maxDeathDateBoss, currentBoss) => {
			const maxDeathDate = maxDeathDateBoss ? new Date(maxDeathDateBoss.deathDate) : null;
			const currentDeathDate = currentBoss.deathDate ? new Date(currentBoss.deathDate) : null;

			if (!maxDeathDate || (currentDeathDate && currentDeathDate > maxDeathDate)) {
				return currentBoss;
			} else {
				return maxDeathDateBoss;
			}
		}, null);

		return bossWithLatestDeathDate;
	};

	$: optionsVisible = false;
	const toggleOptions = () => {
		optionsVisible = !optionsVisible;
	};

	const closeOptions = () => {
		optionsVisible = false;
	};

	let setDeathsValue = 0;
	$: setDeathsModalVisible = false;
	const toggleSetDeathsModal = () => {
		setDeathsValue = currentBoss.deaths;
		setDeathsModalVisible = !setDeathsModalVisible;
	};

	const setDeaths = async (boss, deaths) => {
		const bossIndex = bossList.indexOf(boss);
		const response = await fetch(`/api/runs/${run.id}/boss/${boss.id}/set/${deaths}`, {
			method: 'POST'
		});
		if (response.status === 200) {
			bossList[bossIndex].deaths = deaths;
			currentBoss = bossList[bossIndex];
			toggleSetDeathsModal();
		} else {
			console.log('something went wrong');
			console.log(await response.json());
		}
	};

	$: reviveModalVisible = false;
	const toggleReviveModal = () => {
		reviveModalVisible = !reviveModalVisible;
	};

	const reviveBoss = async (boss) => {
		const bossIndex = bossList.indexOf(boss);
		const response = await fetch(`/api/runs/${run.id}/boss/${boss.id}/revive`, {
			method: 'POST'
		});
		if (response.status === 200) {
			bossList[bossIndex].deathDate = null;
			bossList[bossIndex].deathTimeSince = null;
			bossList[bossIndex].deathDateString = null;
			currentBoss = bossList[bossIndex];
			toggleReviveModal();
		} else {
			console.log('something went wrong');
			console.log(await response.json());
		}
	};

	$: ratingModalVisible = false;
	const toggleRatingModal = () => {
		ratingModalVisible = !ratingModalVisible;
	};

	let userDifficultyRating = 0;
	let userEnjoymentRating = 0;
	let errorText = '';

	const rateBoss = async () => {
		await fetch(
			`/api/boss/${currentBoss.id}/user/${userData?.id}?difficulty=${userDifficultyRating}&enjoyment=${userEnjoymentRating}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		).then((res) => {
			console.log(res);
			if (res.status === 200) {
				toggleRatingModal();
			} else {
				errorText = 'Something went wrong';
			}
		});
	};

	$: bossListOpen = false;
	const toggleBossList = () => {
		bossListOpen = !bossListOpen;
	};
	$: if (searchBoss.length > 0) {
		bossListOpen = true;
	} else {
		bossListOpen = false;
	}

	$: filter = 'all';
	const setFilter = (newFilter) => {
		filter = newFilter;
		switch (newFilter) {
			case 'all':
				bossList = bosses;
				break;
			case 'killed':
				bossList = bosses.filter((boss) => boss.deathDate !== null);
				break;
			case 'not-killed':
				bossList = bosses.filter((boss) => boss.deathDate === null);
				break;
			case 'ongoing':
				bossList = bosses.filter((boss) => boss.deathDate === null && boss.deaths > 0);
				break;
		}
	};

	const getStatColour = (stat: number, averageStat: number) => {
		if (stat === averageStat) return '#e7e5e4';
		if (stat > averageStat) return '#ef4444';
		if (stat < averageStat) return '#22c55e';
	};

	$: runReportOpen = true;
	const toggleRunReport = () => {
		runReportOpen = !runReportOpen;
		toggleBossList();
	};
</script>

<div class="flex w-full">
	<div class="border-r-[1px] border-stone-700 px-2 w-80 md:flex flex-col hidden">
		<div class="flex flex-col transition-all w-full gap-2 my-2 h-full grow">
			<button
				class="border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
				style={runReportOpen ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
				on:click={() => (runReportOpen = !runReportOpen)}>Run Report</button
			>
			<div
				class="bg-stone-900 border-stone-600 border-[1px] flex gap-2 items-center rounded-lg px-2"
			>
				<IconoirSearch />
				<input
					type="text"
					placeholder="Seach bosses..."
					bind:value={searchBoss}
					on:input={() => (bossList = searchBossesByName(bosses, searchBoss))}
					class="bg-stone-900 w-full pr-2"
				/>
			</div>
			<div class="flex text-sm gap-1 justify-center text-center">
				<button
					class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
					style={filter === 'all' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
					on:click={() => setFilter('all')}>All</button
				>
				<button
					class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
					style={filter === 'killed' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
					on:click={() => setFilter('killed')}>Killed</button
				>
				<button
					class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
					style={filter === 'not-killed' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
					on:click={() => setFilter('not-killed')}>Not Killed</button
				>
				<button
					class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
					style={filter === 'ongoing' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
					on:click={() => setFilter('ongoing')}>Ongoing</button
				>
			</div>
			<div class="overflow-y-auto grow flex flex-col gap-1">
				{#if bossList.length === 0}
					<div>No bosses found</div>
				{/if}
				{#each bossList as boss}
					<div>
						<button
							class="w-full text-left font-display leading-4 flex gap-1 align-top items-center truncate max-w-72 text-sm"
							on:click={() => setBoss(boss)}
							>{#if boss.deathDate}
								<div>
									<IconoirCheckCircle />
								</div>
							{:else}
								<div>
									<IconoirCircle />
								</div>
							{/if}
							<div
								class={`${
									boss.id === currentBoss.id ? 'text-[#FFA500]' : ''
								} truncate hover:text-ember duration-200`}
							>
								{boss.name}
							</div>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
	{#key runReportOpen}
		<div class="flex flex-col px-2 gap-4 mx-auto py-4">
			<button
				class="flex md:hidden absolute left-0 mt-4 border-stone-600 border-[1px] border-l-0 rounded-r-lg"
				on:click={() => toggleBossList()}
			>
				<LetsIconsExpandRight class="w-10 h-10" />
			</button>
			{#if !runReportOpen}
				<div>
					{#key currentBoss.id}
						<div class="mx-auto pt-4" in:fade={{ duration: 500 }}>
							<div class="flex flex-col gap-4">
								<div class="text-4xl font-title w-80 md:w-96 text-center mx-auto">
									{currentBoss.name}
								</div>
								<div>
									<div class="flex gap-2 text-xl items-center justify-center h-full">
										<div
											class="flex flex-col w-28 md:w-32 px-2 border-[1px] border-stone-600 bg-stone-800 rounded-lg"
										>
											<div class="">Deaths</div>
											<div class="flex text-2xl md:text-3xl">
												<div><MaterialSymbolsHeartBroken /></div>
												<div class="grow" />
												<div>
													{currentBoss.numRuns > 0 ? currentBoss.avgDeaths.toFixed(0) : '-'}
												</div>
											</div>
										</div>
										<div
											class="flex flex-col w-28 md:w-32 px-2 border-[1px] border-stone-600 bg-stone-800 rounded-lg"
										>
											<div class="text-xl">Difficulty</div>
											<div class="flex text-2xl md:text-3xl">
												<div><IconoirGym /></div>
												<div class="grow" />
												<div>
													{currentBoss.numRatings
														? currentBoss.avgDifficultyRating.toFixed(1)
														: '-'}
												</div>
											</div>
										</div>
										<div
											class="flex flex-col w-28 md:w-32 px-2 border-[1px] border-stone-600 bg-stone-800 rounded-lg"
										>
											<div class="text-xl">Enjoyment</div>
											<div class="flex text-2xl md:text-3xl">
												<div><IconoirGym /></div>
												<div class="grow" />
												<div>
													{currentBoss.numRatings ? currentBoss.avgEnjoymentRating.toFixed(1) : '-'}
												</div>
											</div>
										</div>
									</div>
								</div>
								runs
								<div class="relative">
									{#if auth}
										<div
											role="table"
											class="flex absolute right-0 mr-2 mt-2"
											on:mouseleave={() => closeOptions()}
										>
											{#if optionsVisible}
												<div
													transition:fade={{ duration: 100 }}
													class="ml-5 flex flex-col gap-0 text-stone-200 bg-stone-700 hover:bg-stone-400 rounded-xl drop-shadow-md"
												>
													{#if currentBoss.deathDate}
														<button
															class="bg-stone-800 px-4 pt-1 rounded-t-xl border-solid border-[1px] border-b-0 border-stone-600 hover:bg-ember transition-all"
															on:click={() => toggleReviveModal()}>Revive Boss</button
														>
													{:else}
														<div
															class="bg-stone-900 text-stone-500 px-4 pt-1 rounded-t-xl border-solid border-[1px] border-b-0 border-stone-600 strikethrough transition-all"
														>
															Revive Boss
														</div>
													{/if}
													<div
														class="flex items-center justify-center border-solid border-[1px] border-y-0 border-stone-600"
													>
														<div class=" h-[1px] w-full bg-stone-600" />
													</div>
													<button
														class="bg-stone-800 px-4 pb-1 rounded-b-xl border-solid border-[1px] border-t-0 border-stone-600 hover:bg-ember transition-all"
														on:click={() => toggleSetDeathsModal()}
													>
														Set Deaths
													</button>
												</div>
											{/if}
											<div class="text-2xl">
												<button on:click={() => toggleOptions()}>
													<IconoirMoreHorizCircle />
												</button>
											</div>
										</div>
									{/if}
									<div
										class="flex flex-col gap-4 bg-stone-800 rounded-lg p-2 border-stone-600 border-[1px]"
									>
										<div class="flex flex-wrap gap-4 justify-center">
											<button on:click={() => goto(`/boss/${currentBoss.id}`)}>
												<img alt="boss" class="w-64 h-64 mx-auto" src={currentBoss.bossImage} />
											</button>
											<div class="">
												<div
													class="flex md:flex-col gap-2 text-xl items-center justify-center h-full"
												>
													<div class="flex flex-col w-28 md:w-32 px-2">
														<div class="">Deaths</div>
														<div class="flex text-2xl md:text-3xl">
															<div><MaterialSymbolsHeartBroken /></div>
															<div class="grow" />
															<div
																style={currentBoss.deaths
																	? `color: ${getStatColour(
																			currentBoss.deaths,
																			currentBoss.avgDeaths
																	  )}`
																	: ''}
															>
																{currentBoss.deaths.toFixed(0) ?? '-'}
															</div>
														</div>
													</div>
													<div class="flex flex-col w-28 md:w-32 px-2">
														<div class="text-xl">Difficulty</div>
														<div class="flex text-2xl md:text-3xl">
															<div><IconoirGym /></div>
															<div class="grow" />
															<div
																style={currentBoss.userDifficultyRating
																	? `color: ${getStatColour(
																			currentBoss.avgDifficultyRating,
																			currentBoss.userDifficultyRating
																	  )}`
																	: ''}
															>
																{currentBoss.userDifficultyRating || '-'}
															</div>
														</div>
													</div>
													<div class="flex flex-col w-28 md:w-32 px-2">
														<div class="text-xl">Enjoyment</div>
														<div class="flex text-2xl md:text-3xl">
															<div><IconoirGym /></div>
															<div class="grow" />
															<div
																style={currentBoss.userEnjoymentRating
																	? `color: ${getStatColour(
																			currentBoss.avgEnjoymentRating,
																			currentBoss.userEnjoymentRating
																	  )}`
																	: ''}
															>
																{currentBoss.userEnjoymentRating || '-'}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										{#key currentBoss}
											<div class="flex align-middle items-center justify-center">
												{#if !currentBoss.deathDate && auth}
													<div class="flex flex-col gap-2">
														<div class="flex gap-8 justify-center items-center">
															<button
																class="py-1 w-32 border-stone-400 hover:bg-ember hover:border-ember border-[1px] rounded-lg flex items-center justify-center duration-200"
																on:click={() => removeDeath(currentBoss)}>Remove Death</button
															>
															<button
																class="py-1 w-32 border-stone-400 hover:bg-ember hover:border-ember border-[1px] rounded-lg duration-200"
																on:click={() => addDeath(currentBoss)}>Add Death</button
															>
														</div>
													</div>
												{:else}
													<div class="text-3xl h-[116px] text-center flex flex-col justify-center">
														{#if currentBoss.deathDate}
															<div
																class="font-title flex-col"
																style="color: {currentBoss.killColour}"
															>
																{currentBoss.killText.toUpperCase()}
															</div>
															<div class="font-display opacity-40 text-sm">
																{currentBoss.deathDateString}
															</div>
														{/if}
													</div>
												{/if}
											</div>
											{#if !currentBoss.deathDate && auth}
												<div class="flex justify-center">
													<button
														class="border-[1px] border-stone-400 hover:bg-ember hover:border-ember w-40 rounded-lg py-2 duration-200 text-xl"
														on:click={() => killBoss(currentBoss)}>Boss Killed</button
													>
												</div>
											{/if}
										{/key}
									</div>
								</div>
							</div>
						</div>
					{/key}
				</div>
			{:else if runData && reports}
				<div>
					<div>
						<div class="flex flex-col gap-4">
							<div class="text-center font-display text-4xl w-80 md:w-96 mx-auto">
								{runData.runName}
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
													{#if boss.deathDate !== null}
														<button
															class="text-left w-64 lg:w-96 truncate hover:text-stone-400 duration-200"
															on:click={() => goto(`/boss/${boss.bossId}`)}>{boss.bossName}</button
														>

														<div
															class="w-8 text-center"
															style="color: {getStatColour(
																boss.deaths,
																Math.round(boss.averageDeaths)
															)}"
															use:tippy={{
																content: `Average deaths: ${Math.round(boss.averageDeaths)}`,
																placement: 'left',
																allowHTML: true
															}}
														>
															{boss.deaths}
														</div>
														<div
															class="w-8 text-center"
															use:tippy={{
																content: `Average difficulty: ${boss.averageDifficulty}`,
																placement: 'left',
																allowHTML: true
															}}
														>
															{boss.difficulty}
														</div>
														<div
															class="w-8 text-center"
															use:tippy={{
																content: `Average enjoyment: ${boss.averageEnjoyment}`,
																placement: 'left',
																allowHTML: true
															}}
														>
															{boss.enjoyment}
														</div>
														<div class="hidden lg:block">
															<div class="w-48 text-center">
																{dayjs(boss.deathDate).format('Do MMMM YYYY')}
															</div>
														</div>
													{:else}
														{#if boss.deaths == null}
															<button
																class="text-left w-64 lg:w-96 truncate line-through text-stone-400 hover:text-stone-500 duration-200"
																on:click={() => goto(`/boss/${boss.bossId}`)}
																>{boss.bossName}</button
															>
															<div class="w-8 text-center text-stone-400">-</div>
														{:else}
															<button
																class="text-left w-64 lg:w-96 truncate text-stone-400 hover:text-stone-500 duration-200"
																on:click={() => goto(`/boss/${boss.bossId}`)}
																>{boss.bossName}</button
															>
															<div class="w-8 text-center text-stone-400">{boss.deaths}</div>
														{/if}
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
				</div>
			{/if}
		</div>
	{/key}
</div>
{#if reviveModalVisible}
	<div
		transition:fade={{ duration: 200 }}
		id="backdrop"
		class="h-screen fixed top-0 w-screen cursor-default flex justify-center items-center"
		on:click|self={() => toggleReviveModal()}
		on:keypress={(e) => e.key === 'Escape' && toggleReviveModal()}
		tabindex="0"
		role="button"
	>
		<div class="absolute opacity-100 w-64 bg-stone-200 rounded-xl py-8 px-4 text-stone-800">
			<div class="flex flex-col gap-4">
				<div class="text-center text-lg">
					Are you sure you wish to revive <span class="font-bold text-black"
						>{currentBoss.name}</span
					>?
				</div>
				<div class="flex mx-4">
					<button
						class="p-2 px-4 w-20 rounded-full text-stone-200 bg-red-800"
						on:click={() => toggleReviveModal()}>Cancel</button
					>
					<div class="grow" />
					<button
						class="p-2 px-4 w-20 rounded-full text-stone-200 bg-black"
						on:click={() => reviveBoss(currentBoss)}>Revive</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
{#if setDeathsModalVisible}
	<div
		transition:fade={{ duration: 200 }}
		id="backdrop"
		class="h-screen fixed top-0 w-screen cursor-default flex justify-center items-center"
		on:click|self={() => toggleSetDeathsModal()}
		on:keypress={(e) => e.key === 'Escape' && toggleSetDeathsModal()}
		tabindex="0"
		role="button"
	>
		<div class="absolute opacity-100 w-64 bg-stone-200 rounded-xl py-8 px-4 text-stone-800">
			<div class="flex flex-col gap-4">
				<div class="text-center text-lg">
					Set <span class="font-bold text-black">{currentBoss.name}</span> Death Count
				</div>
				<input class="mx-4 text-center" type="number" bind:value={setDeathsValue} />
				<div class="flex mx-4">
					<button
						class="p-2 px-4 w-20 rounded-full text-stone-200 bg-red-800"
						on:click={() => toggleSetDeathsModal()}>Cancel</button
					>
					<div class="grow" />
					<button
						class="p-2 px-4 w-20 rounded-full text-stone-200 bg-black"
						on:click={() => setDeaths(currentBoss, setDeathsValue)}>Set</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
{#if ratingModalVisible}
	<div
		transition:fade={{ duration: 200 }}
		id="backdrop"
		class="h-screen fixed top-0 w-screen cursor-default flex justify-center items-center"
		on:click|self={() => toggleReviveModal()}
		on:keypress={(e) => e.key === 'Escape' && toggleReviveModal()}
		tabindex="0"
		role="button"
	>
		<div class="absolute opacity-100 w-64 bg-stone-200 rounded-xl p-4 text-stone-800">
			<div class="flex flex-col gap-2 justify-center items-center w-full">
				<div>Rate <span class="font-bold">{currentBoss.name}</span></div>
				<div class="flex w-full gap-4">
					<div class="flex flex-col w-full">
						<label for="experience" class="text-sm opacity-60">Difficulty</label>
						<input
							type="range"
							class="accent-ember"
							id="enjoyment"
							min="0"
							max="10"
							bind:value={userDifficultyRating}
						/>
					</div>
					<div>{userDifficultyRating}</div>
				</div>

				<div class="flex w-full gap-4">
					<div class="flex flex-col w-full">
						<label for="enjoyment" class="text-sm opacity-60">Enjoyment</label>
						<input
							type="range"
							class="accent-ember"
							id="enjoyment"
							min="0"
							max="10"
							bind:value={userEnjoymentRating}
						/>
					</div>
					<div class="text-title">{userEnjoymentRating}</div>
				</div>
				<div class="h-2" />
				<button
					on:click={() => rateBoss()}
					class="text-xl bg-stone-200 text-black p-2 px-4 rounded-full w-32"
				>
					<div class="bg-black text-stone-200 p-2 rounded-full">Submit</div>
				</button>
				<div class="h-4 text-red-800 text-md">{errorText}</div>
			</div>
		</div>
	</div>
{/if}
{#if bossListOpen}
	<div
		transition:fade={{ duration: 200 }}
		id="backdrop"
		class="fixed top-0 w-screen cursor-default h-screen"
		on:click|self={() => toggleBossList()}
		on:keypress={(e) => e.key === 'Escape' && toggleBossList()}
		tabindex="0"
		role="button"
	>
		<div
			class="absolute opacity-100 inset-y-0 top-0 flex"
			transition:fly={{ x: -1000, duration: 500 }}
		>
			<div class=" bg-stone-900 px-2 text-stone-200 h-screen overflow-y-auto pb-16">
				<div class="w-80 flex flex-col">
					<div class="flex flex-col transition-all w-full gap-2 my-2">
						<button
							class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
							style={filter === 'all' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
							on:click={() => toggleRunReport()}>Run Report</button
						>
						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2">
								<div
									class="bg-stone-900 border-stone-600 border-[1px] flex gap-2 items-center rounded-lg px-2 grow"
								>
									<IconoirSearch />
									<input
										type="text"
										placeholder="Seach bosses..."
										bind:value={searchBoss}
										on:input={() => (bossList = searchBossesByName(bosses, searchBoss))}
										class="bg-stone-900 w-full pr-2"
									/>
								</div>
							</div>
							<div class="flex text-sm gap-1 justify-center text-center">
								<button
									class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
									style={filter === 'all' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
									on:click={() => setFilter('all')}>All</button
								>
								<button
									class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
									style={filter === 'killed'
										? 'background-color: #F05E1B; border-color: #F05E1B'
										: ''}
									on:click={() => setFilter('killed')}>Killed</button
								>
								<button
									class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
									style={filter === 'not-killed'
										? 'background-color: #F05E1B; border-color: #F05E1B'
										: ''}
									on:click={() => setFilter('not-killed')}>Not Killed</button
								>
								<button
									class="grow border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] basis-1 rounded-lg px-1"
									style={filter === 'ongoing'
										? 'background-color: #F05E1B; border-color: #F05E1B'
										: ''}
									on:click={() => setFilter('ongoing')}>Ongoing</button
								>
							</div>
							<div class="grow flex flex-col gap-1">
								{#if bossList.length === 0}
									<div>No bosses found</div>
								{/if}
								{#each bossList as boss}
									<div>
										<button
											class="w-full text-left font-display leading-4 flex gap-1 align-top items-center truncate max-w-72 text-sm"
											on:click={() => setBoss(boss)}
											>{#if boss.deathDate}
												<div>
													<IconoirCheckCircle />
												</div>
											{:else}
												<div>
													<IconoirCircle />
												</div>
											{/if}
											<div
												class={`${
													boss.id === currentBoss.id ? 'text-[#FFA500]' : ''
												} truncate hover:text-ember duration-200`}
											>
												{boss.name}
											</div>
										</button>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	#scrollbox {
		mask-image: linear-gradient(to bottom, black calc(100% - 48px), transparent 100%);
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

	#backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	#boxShadow {
		box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(0, 0, 0, 0.05),
			0px 2px 2px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05),
			0px 8px 8px 0px rgba(0, 0, 0, 0.05), 0px 16px 16px 0px rgba(0, 0, 0, 0.05);
	}
</style>
