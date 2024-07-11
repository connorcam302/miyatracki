<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import ParentBox from '$lib/components/ParentBox.svelte';
	import MdiTallyMark1 from 'virtual:icons/mdi/tally-mark-1';
	import MdiTallyMark2 from 'virtual:icons/mdi/tally-mark-2';
	import MdiTallyMark3 from 'virtual:icons/mdi/tally-mark-3';
	import MdiTallyMark4 from 'virtual:icons/mdi/tally-mark-4';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import IconoirNavArrowRight from 'virtual:icons/iconoir/nav-arrow-right';
	import IconoirNavArrowLeft from 'virtual:icons/iconoir/nav-arrow-left';
	import MaterialSymbolsHeartBroken from 'virtual:icons/material-symbols/heart-broken';
	import IconoirBonfire from 'virtual:icons/iconoir/bonfire';
	import IconoirUser from 'virtual:icons/iconoir/user';
	import IconoirGraphUp from 'virtual:icons/iconoir/graph-up';
	import IconoirClock from 'virtual:icons/iconoir/clock';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);
	import Loading from '$lib/icons/Loading.svelte';
	import { getStatColour, getExperienceTitle } from '$lib/functions';
	import { fade } from 'svelte/transition';
	import tippy from 'sveltejs-tippy';

	const props = {
		content: "<span class='tooltip'>Intermediate</span>",
		allowHTML: true,
		placement: 'bottom'
	};

	export let data;

	console.log(data);

	$: viewport = getContext('viewport');

	$: userDifficultyRating = null;
	$: userEnjoymentRating = null;
	$: userDifficultyRatingText = null;
	$: userEnjoymentRatingText = null;
	$: userRuns = [];

	$: updateButton = 'Update';

	const { boss } = data;

	const handleError = (ev) => (ev.target.src = '/fallback-pfp.webp');
	const updateRating = async (
		bossId: number,
		newDifficultyRating: number,
		newEnjoymentRating: number,
		ratingType: string
	) => {
		console.log(newDifficultyRating, newEnjoymentRating);
		const response = await fetch(
			`/api/boss/${bossId}/user/${data.userData.id}?difficulty=${userDifficultyRating}&enjoyment=${userEnjoymentRating}`,
			{
				method: 'POST'
			}
		).then(() => {
			if (ratingType === 'difficulty') {
				userDifficultyRatingText = '✓';
				setTimeout(() => {
					userDifficultyRatingText = newDifficultyRating;
				}, 1000);
			} else {
				userEnjoymentRatingText = '✓';
				setTimeout(() => {
					userEnjoymentRatingText = newEnjoymentRating;
				}, 1000);
			}
		});
	};

	onMount(() => {
		const getUserRatings = async () => {
			await fetch(`/api/boss/${data.boss.bossId}/user/${data.userData?.id}`).then((res) => {
				if (res.status === 200) {
					res.json().then((data) => {
						if (data.status === 200 && data.data.length > 0) {
							userDifficultyRating = data.data[0].difficultyRating;
							userEnjoymentRating = data.data[0].enjoymentRating;
							userDifficultyRatingText = userDifficultyRating;
							userEnjoymentRatingText = userEnjoymentRating;
						}
					});
				}
			});
		};

		getUserRatings();
	});
</script>

<div class="mx-auto py-4 px-2" in:fade={{ duration: 500 }}>
	<div class="flex flex-col gap-4 justify-center items-center">
		<div class="text-4xl font-title w-80 md:w-96 text-center mx-auto">
			{boss.bossName}
		</div>
		<div class="flex flex-wrap justify-center gap-4">
			<img class="h-96 md:h-96" src={boss.bossImage} alt={boss.bossName} />
			<div class="flex md:flex-col gap-1 md:gap-2 text-xl items-center justify-center md:h-96">
				<div class="grow" />
				<div
					class="flex flex-col w-28 md:w-48 px-2 border-[1px] border-stone-600 bg-stone-800 rounded-lg py-1"
				>
					<div class="text-base md:text-xl">Deaths</div>
					<div class="flex text-2xl">
						<div><MaterialSymbolsHeartBroken /></div>
						<div class="grow" />
						<div>
							{boss.killCount > 0 ? Number(boss.avgDeaths).toFixed(0) : '-'}
						</div>
					</div>
				</div>
				<div class="grow" />
				<div
					class="flex flex-col w-28 md:w-48 px-2 border-[1px] border-stone-600 bg-stone-800 rounded-lg py-1"
				>
					<div class="text-base md:text-xl">Difficulty</div>
					<div class="flex text-2xl">
						<div><IconoirGym /></div>

						<div class="grow" />
						<div>
							{boss.killCount ? Number(boss.difficultyRating).toFixed(1) : '-'}
						</div>
					</div>
				</div>
				<div class="grow" />
				<div
					class="flex flex-col w-28 md:w-48 px-2 border-[1px] border-stone-600 bg-stone-800 rounded-lg py-1"
				>
					<div class="text-base md:text-xl">Enjoyment</div>
					<div class="flex text-2xl">
						<div><IconoirGym /></div>
						<div class="grow" />
						<div>
							{boss.killCount ? Number(boss.enjoymentRating).toFixed(1) : '-'}
						</div>
					</div>
				</div>
				<div class="grow" />
			</div>
		</div>
		{#if data.userData?.id}
			<div
				class="flex flex-col gap-2 px-2 max-w-screen-md border-[1px] border-stone-600 bg-stone-800 rounded-lg py-1"
			>
				<div class="text-2xl">Your Rating</div>
				<div class="flex">
					<div class="flex gap-2 px-2 text-xl">
						<IconoirGym />
						<input
							type="range"
							class="accent-ember w-24 md:w-48"
							id="enjoyment"
							min="0"
							max="10"
							bind:value={userDifficultyRating}
							on:change={() =>
								updateRating(boss.bossId, userDifficultyRating, userEnjoymentRating, 'difficulty')}
						/>
						{#if userDifficultyRating === null}
							<div class="w-6 text-center">-</div>
						{:else if userDifficultyRating === 'loading'}
							<div class="w-6 text-center"><Loading /></div>
						{:else}
							<div class="w-6 text-center">{userDifficultyRatingText}</div>
						{/if}
					</div>
					<div class="grow" />
					<div class="flex gap-2 px-2 text-xl">
						<IconoirGym />
						<input
							type="range"
							class="accent-ember w-24 md:w-48"
							id="enjoyment"
							min="0"
							max="10"
							bind:value={userEnjoymentRating}
							on:change={() =>
								updateRating(boss.bossId, userDifficultyRating, userEnjoymentRating, 'enjoyment')}
						/>

						{#if userEnjoymentRating === null}
							<div class="w-6 text-center">-</div>
						{:else if userEnjoymentRating === 'loading'}
							<div class="w-6 text-center"><Loading /></div>
						{:else}
							<div class="w-6 text-center">{userEnjoymentRatingText}</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		{#if data.bossRuns.length === 0}
			<div class="text-2xl">No runs found</div>
		{:else}
			<div class="flex flex-col justify-between items-center gap-4">
				{#each data.bossRuns as run}
					<button
						class="flex items-center md:w-full w-96 text-stone-300 hover:text-stone-100 bg-stone-800 hover:bg-stone-750 rounded-lg p-2 border-stone-600 border-[1px] duration-200 max-w-screen-sm"
						on:click={() => goto('/runs/' + run.id)}
					>
						<div class="flex flex-col text-left gap-0.5">
							<div class="text-2xl truncate w-60 md:w-96">{run.name}</div>
							<button
								on:click|stopPropagation={() => goto(`/user/${run.userId}`)}
								class="flex gap-1 items-center hover:text-stone-400 duration-200 overflow-hidden"
							>
								<IconoirUser />
								<div class="text-lg">{run.userDisplayName}</div>
							</button>
							<div class="flex gap-1 items-center">
								<IconoirGraphUp />
								<div style="color: {getExperienceTitle(run.experience).colour}">
									{getExperienceTitle(run.experience).title}
								</div>
							</div>
							<div class="flex gap-1 items-center">
								<MaterialSymbolsHeartBroken />
								<div>{run.deaths}</div>
							</div>
							<div class="flex gap-1 items-center">
								<IconoirClock />
								<div>{dayjs(run.date).fromNow()}</div>
							</div>
						</div>
						<div class="grow" />
						<button on:click|stopPropagation={() => goto(`/user/${run.runUserId}`)}>
							<img
								src={run.userProfilePicture}
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
</div>

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
</style>
