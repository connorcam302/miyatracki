<script>
	export let data;
	import { onMount } from 'svelte';
	import ParentBox from '$lib/components/ParentBox.svelte';
	import ChildBox from '$lib/components/ChildBox.svelte';
	import IconoirSearch from 'virtual:icons/iconoir/search';
	import IconoirCopy from 'virtual:icons/iconoir/copy';
	import IconoirCheck from 'virtual:icons/iconoir/check';
	import IconoirShareAndroid from 'virtual:icons/iconoir/share-android';
	import IconoirUser from 'virtual:icons/iconoir/user';
	import IconoirGamepad from 'virtual:icons/iconoir/gamepad';
	import IconoirClock from 'virtual:icons/iconoir/clock';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import MaterialSymbolsHeartBroken from 'virtual:icons/material-symbols/heart-broken';
	import IconoirXmark from '~icons/iconoir/xmark';
	import { fade } from 'svelte/transition';
	import { getKillButtonInfo } from '$lib/functions';

	const { run, bosses, user } = data;
	let bossList = bosses;

	console.log(bosses, run, user);
	let currentBoss = bossList[0];

	let searchBoss = null;
	const searchBossesByName = (allBosses, searchString) => {
		const lowerSearchString = searchString.toLowerCase();

		return allBosses.filter((boss) => boss.name.toLowerCase().includes(lowerSearchString));
	};

	const setBoss = (boss) => {
		currentBoss = boss;
	};

	let copyState = 'normal';
	const copyToClipboard = (text) => {
		copyState = 'copied';

		setTimeout(() => {
			copyState = 'normal';
		}, 2000);
	};

	const addDeath = async (boss) => {
		const bossIndex = bossList.indexOf(boss);
		const response = await fetch(`/api/runs/${run.id}/${boss.id}/add`, {
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
		const response = await fetch(`/api/runs/${run.id}/${boss.id}/remove`, {
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
</script>

<div class="flex flex-wrap">
	<div class="flex">
		<ParentBox>
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
					<div class="overflow-auto h-96 pb-8 w-72 flex flex-col gap-0.5" id="list">
						{#if bossList.length === 0}
							<div>No bosses found</div>
						{/if}
						{#each bossList as boss}
							<div>
								<button class="w-full text-left font-display" on:click={() => setBoss(boss)}
									>{boss.name}</button
								>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</ParentBox>
	</div>
	<div class="">
		<div class="flex flex-wrap justify-center h-full w-full">
			<div class="rounded-[48px] bg-stone-700 py-5 px-5 m-2 bg-opacity-[.30] w-max">
				<div class="flex flex-col gap-2 w-72">
					<img
						alt="profile"
						class="w-48 h-48 mx-auto mt-4"
						src="https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/artorias.png"
					/>
					<div class="font-display text-center text-2xl">
						{currentBoss.name}
					</div>
					<div class="text-5xl flex items-center justify-center align-middle">
						<div class="flex-1 text-right font-title">{currentBoss.deaths}</div>
						<div class="text-4xl"><IconoirXmark /></div>
						<div class="flex-1"><MaterialSymbolsHeartBroken /></div>
					</div>
					<div class="flex align-middle items-center">
						<div>
							<button
								class="my-auto text-xs font-bold p-2 px-4 rounded-full text-stone-200 bg-red-800"
								on:click={() => removeDeath(currentBoss)}>Remove Death</button
							>
						</div>
						<div class="flex-grow" />
						<div>
							<button
								class="text-xl font-bold p-4 px-6 rounded-full text-black bg-stone-200"
								on:click={() => addDeath(currentBoss)}>Add Death</button
							>
						</div>
					</div>
					<button
						class={'bg-black text-xl mt-2 -mx-5 -mb-5 p-4 rounded-b-[40px] font-title font-bold'}
						style="color: {currentBoss.buttonColour}">{currentBoss.buttonText.toUpperCase()}</button
					>
				</div>
			</div>
		</div>
	</div>
	<div class="">
		<ParentBox>
			<div class="flex flex-col">
				<img src={user.profilePicture} class="w-56 h-56 rounded-full p-10" />
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
						<div class="opacity-60">{run.latestKill}</div>
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
				</div>
			</div>
		</ParentBox>
	</div>
</div>

<style>
	#list {
		mask-image: linear-gradient(to bottom, black calc(100% - 48px), transparent 100%);
	}
</style>
