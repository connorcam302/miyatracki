<script>
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
	import IconoirXmark from 'virtual:icons/iconoir/xmark';
	import IconoirCircle from 'virtual:icons/iconoir/circle';
	import IconoirCheckCircle from 'virtual:icons/iconoir/check-circle';
	import IconoirMoreHorizCircle from '~icons/iconoir/more-horiz-circle';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { getTimeSinceEpoch, getDateString, truncateString } from '$lib/functions';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	const { run, bosses, user, userData } = data;
	$: viewport = getContext('viewport');
	let bossList = bosses;
	let urlBoss = Number($page.url.searchParams.get('boss'));

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
		if (boss.id > currentBoss.id) {
			direction = '1';
		} else {
			direction = '-1';
		}

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
	$: if (searchBoss.length > 0) {
		bossListOpen = true;
	} else {
		bossListOpen = false;
	}
</script>

<div class="flex flex-wrap justify-center items-center">
	<div class="flex flex-none">
		<ParentBox>
			{#if $viewport === 'mobile'}
				<div class="flex flex-col transition-all">
					<div class="w-80 flex items-center gap-2">
						<div class="bg-stone-700 flex gap-2 items-center rounded-xl px-2 my-2 grow">
							<IconoirSearch />
							<input
								type="text"
								placeholder="Seach bosses..."
								bind:value={searchBoss}
								on:input={() => (bossList = searchBossesByName(bosses, searchBoss))}
								class="bg-stone-700 w-full pr-2"
							/>
						</div>
						<button
							class="bg-stone-200 text-black rounded-full px-2 text-xl"
							on:click={() => (searchBoss = '')}><IconoirXmark /></button
						>
					</div>
					{#if bossListOpen}
						<div class="overflow-auto h-[420px] pb-8 w-80 flex flex-col gap-2" id="scrollbox">
							{#if bossList.length === 0}
								<div>No bosses found</div>
							{/if}
							{#each bossList as boss}
								<div>
									<button
										class="w-full text-left font-display leading-5 flex gap-1 align-top items-top"
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
										{boss.name}
									</button>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{:else}
				<div class="pr-2">
					<div>
						<div class="bg-stone-700 flex gap-2 items-center rounded-xl px-2 my-2">
							<IconoirSearch />
							<input
								type="text"
								placeholder="Seach bosses..."
								bind:value={searchBoss}
								on:input={() => (bossList = searchBossesByName(bosses, searchBoss))}
								class="bg-stone-700 w-full pr-2"
							/>
						</div>
						<div class="overflow-auto h-[420px] pb-8 w-72 flex flex-col gap-2" id="scrollbox">
							{#if bossList.length === 0}
								<div>No bosses found</div>
							{/if}
							{#each bossList as boss}
								<div>
									<button
										class="w-full text-left font-display leading-5 flex gap-1 align-top items-top"
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
										{boss.name}
									</button>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</ParentBox>
	</div>
	<div class="w-96 h-[524px] relative flex justify-center">
		{#key currentBoss.id}
			<div class="flex justify-center absolute">
				<div
					in:fly={{
						delay: 150,
						duration: 1000,
						easing: quintOut,
						[$viewport == 'mobile' ? 'x' : 'y']: direction * 150
					}}
					out:fly={{
						duration: 1000,
						easing: quintOut,
						[$viewport == 'mobile' ? 'x' : 'y']: direction * -1 * 150
					}}
					class="relative rounded-[48px] bg-stone-700 py-5 px-5 m-2 bg-opacity-[.30] w-full"
					id="boxShadow"
				>
					{#if auth}
						<div
							role="table"
							class="flex absolute right-0 mr-8 mt-3"
							on:mouseleave={() => closeOptions()}
						>
							{#if optionsVisible}
								<div
									transition:fade={{ duration: 100 }}
									class="ml-5 flex flex-col gap-0 text-stone-800 bg-stone-200 hover:bg-stone-400 rounded-xl drop-shadow-md"
								>
									{#if currentBoss.deathDate}
										<button
											class="bg-stone-200 px-4 pt-1 rounded-t-xl border-solid border-2 border-b-0 border-stone-800 hover:bg-stone-400 transition-all"
											on:click={() => toggleReviveModal()}>Revive Boss</button
										>
									{:else}
										<div
											class="bg-stone-600 px-4 pt-1 rounded-t-xl border-solid border-2 border-b-0 border-stone-800 transition-all"
										>
											Revive Boss
										</div>
									{/if}
									<div
										class="flex items-center justify-center border-solid border-2 border-y-0 border-stone-800"
									>
										<div class=" h-[1px] w-11/12 bg-stone-800" />
									</div>
									<button
										class="bg-stone-200 px-4 pb-1 rounded-b-xl border-solid border-2 border-t-0 border-stone-800 hover:bg-stone-400 transition-all"
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
					<div class="flex flex-col gap-2 w-80">
						<button on:click={() => goto(`/boss/${currentBoss.id}`)}>
							<img alt="boss" class="w-48 h-48 mx-auto mt-4" src={currentBoss.bossImage} />
						</button>
						<button on:click={() => goto(`/boss/${currentBoss.id}`)}>
							<div class="h-16 flex justify-center items-center">
								<div class="font-display text-center text-2xl">
									{currentBoss.name}
								</div>
							</div>
						</button>
						<div class="text-5xl flex items-center justify-center align-middle gap-2">
							<div class="flex-1 text-right font-title">{currentBoss.deaths}</div>
							<div class="text-3xl"><IconoirXmark /></div>
							<div class="flex-1"><MaterialSymbolsHeartBroken /></div>
						</div>
						{#key currentBoss}
							<div class="flex align-middle items-center justify-center">
								{#if !currentBoss.deathDate && auth}
									<div>
										<button
											class="my-auto text-xs font-bold p-2 px-4 rounded-full text-stone-200 bg-red-800"
											on:click={() => removeDeath(currentBoss)}>Remove Death</button
										>
									</div>
									<div class="flex-grow" />
									<div>
										<button
											class="text-xl p-4 px-6 rounded-full font-bold text-black bg-stone-200"
											on:click={() => addDeath(currentBoss)}>Add Death</button
										>
									</div>
								{:else}
									<div class="text-3xl h-[116px] text-center flex flex-col justify-center">
										{#if currentBoss.deathDate}
											<div class="font-title flex-col" style="color: {currentBoss.killColour}">
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
								<button
									class={'bg-black text-xl mt-2 -mx-5 -mb-5 p-4 rounded-b-[40px] font-bold'}
									on:click={() => killBoss(currentBoss)}>Boss Killed</button
								>
							{/if}
						{/key}
					</div>
				</div>
			</div>
		{/key}
	</div>
	<div class="flex-none">
		<ParentBox>
			<div class="flex flex-col">
				<img
					src={user.profilePicture}
					class="w-56 h-56 rounded-full p-10"
					alt="profile"
					referrerpolicy="no-referrer"
				/>
				<div class="m-2 flex flex-col">
					<div class="flex gap-2 items-center">
						<IconoirUser />
						<div class="opacity-60">{user.displayName}</div>
					</div>
					<div class="flex gap-2 items-center">
						<IconoirGamepad />
						<div class="opacity-60">{run.gameTitle}</div>
					</div>
					<div class="flex gap-2 items-center">
						<IconoirClock />
						<div class="opacity-60">{run.startDateString}</div>
					</div>
					<div class="flex gap-2 items-center">
						<IconoirGym />
						{#key currentBoss}
							<div class="opacity-60">{truncateString(getLatestBoss().name)}</div>
						{/key}
					</div>
					<div class="flex h-5 items-top">
						{#key copyState}
							<div
								class="absolute"
								in:fade={{ delay: 105, duration: 300 }}
								out:fade={{ duration: 100 }}
							>
								{#if copyState === 'normal'}
									<button
										class="flex gap-2 items-center"
										on:click={() => copyToClipboard(run.name)}
									>
										<IconoirShareAndroid />
										<div class="transition-all opacity-60">{run.name}</div>
									</button>
								{:else if copyState === 'copied'}
									<button class="flex gap-1 items-center">
										<IconoirCheck />
										<div class="transition-all" style="opacity: 1">Copied!</div>
									</button>
								{/if}
							</div>
						{/key}
					</div>
					<div class="mt-4 flex justify-center">
						<button
							class="bg-stone-200 text-black rounded-full py-1 px-4 text-center hover:bg-stone-400 duration-200"
							on:click={() => goto(`/runs/${run.id}/report`)}
						>
							Generate Run Report
						</button>
					</div>
				</div>
			</div>
		</ParentBox>
	</div>
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
		on:click|self={() => toggleRatingModal()}
		on:keypress={(e) => e.key === 'Escape' && toggleRatingModal()}
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
