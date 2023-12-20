<script>
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
	import tippy from 'sveltejs-tippy';
	import { goto } from '$app/navigation';

	const props = {
		content: "<span class='tooltip'>Intermediate</span>",
		allowHTML: true,
		placement: 'bottom'
	};

	export let data;

	$: viewport = getContext('viewport');

	$: userDifficultyRating = 0;
	$: userEnjoymentRating = 0;
	$: userRuns = [];

	const { boss, supabase, bossData, rating, deaths, userData } = data;
	const { bossDlc, bossName, bossOptional, bossImage, game, bossId } = boss;
	const { difficulty, enjoyment, count } = rating;

	const handleRatingUpdate = () => {
		const response = fetch(
			`/api/boss/${bossId}/user/${userData?.id}?difficulty=${userDifficultyRating}&enjoyment=${userEnjoymentRating}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	};

	onMount(() => {
		const getUserRatings = async () => {
			const response = fetch(`/api/boss/${bossId}/user/${userData?.id}`);

			response.then((res) => {
				if (res.status === 200) {
					res.json().then((data) => {
						if (data.length > 0) {
							userDifficultyRating = data.data[0].difficultyRating;
							userEnjoymentRating = data.data[0].enjoymentRating;
						}
					});
				}
			});
		};

		const getUserRuns = async () => {
			const response = fetch(`/api/boss/${bossId}/user/${userData?.id}/runs`);

			response.then((res) => {
				if (res.status === 200) {
					res.json().then((data) => {
						userRuns = data.data;
					});
				}
			});
		};

		getUserRatings();
		getUserRuns();
	});
</script>

<div class="flex mx-4 my-2">
	{#if bossId !== 1}
		<button
			class="text-xl bg-stone-200 text-black p-2 rounded-full"
			on:click={() => goto(`/boss/${bossId - 1}`)}><IconoirNavArrowLeft /></button
		>
	{/if}
	<div class="grow" />
	{#if bossId !== 177}
		<button
			class="text-xl bg-stone-200 text-black p-2 rounded-full"
			on:click={() => goto(`/boss/${bossId + 1}`)}><IconoirNavArrowRight /></button
		>
	{/if}
</div>
<div class="flex flex-wrap justify-center text-2xl text-stone-200">
	<div>
		<ParentBox>
			<div class="flex flex-col items-center gap-8">
				<div class="flex flex-col px-4 pt-2 items-center">
					<button on:click={() => goto(`/boss/${bossId}`)}>
						<img class="h-64 w-64" src={bossImage} alt="boss" />
					</button>
					<button on:click={() => goto(`/boss/${bossId}`)} class="w-64">
						<div>{bossName}</div>
					</button>
					<div class="text-lg opacity-60">{game}</div>
				</div>
				<div class="flex flex-col w-full items-center gap-1">
					<div>Average Deaths</div>
					<div class="flex justify-center items-center w-full px-2">
						<div class="grow">
							<button
								use:tippy={{
									content: `${deaths[0].average * deaths[0].count} deaths from ${
										deaths[0].count
									} beginner runs.`,
									placement: 'left'
								}}
								class="flex flex-col items-center w-full"
							>
								<MdiTallyMark1 />
								<div>{deaths[0].average > 0 ? deaths[0].average : '-'}</div>
							</button>
						</div>
						<div class="grow">
							<button
								use:tippy={{
									content: `${deaths[1].average * deaths[1].count} deaths from ${
										deaths[1].count
									} novice runs.`,
									placement: 'left'
								}}
								class="flex flex-col items-center w-full"
							>
								<MdiTallyMark2 />
								<div>{deaths[1].average > 0 ? deaths[1].average : '-'}</div>
							</button>
						</div>
						<div class="grow">
							<button
								use:tippy={{
									content: `${deaths[2].average * deaths[2].count} deaths from ${
										deaths[2].count
									} intermediate runs.`,
									placement: 'left'
								}}
								class="flex flex-col items-center w-full"
							>
								<MdiTallyMark3 />
								<div>{deaths[2].average > 0 ? deaths[2].average : '-'}</div>
							</button>
						</div>
						<div class="grow">
							<button
								use:tippy={{
									content: `${deaths[3].average * deaths[3].count} deaths from ${
										deaths[3].count
									} expert runs.`,
									placement: 'left'
								}}
								class="flex flex-col items-center w-full"
							>
								<MdiTallyMark4 />
								<div>{deaths[3].average > 0 ? deaths[3].average : '-'}</div>
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col w-full items-center">
					<div>Rating</div>
					<div class="flex w-full items-center justify-center">
						<button
							use:tippy={{
								content: `Difficulty: ${
									Math.round(Number(difficulty) * 10) / 10
								} from ${count} ratings.`,
								placement: 'left'
							}}
							class="flex gap-2 items-center justify-center"
						>
							<IconoirGym />
							<div class="text-4xl font-display">
								{difficulty !== '-' ? Math.round(Number(difficulty)) : difficulty}
							</div>
						</button>
						<div class="w-32" />
						<button
							use:tippy={{
								content: `Enjoyment: ${
									Math.round(Number(enjoyment) * 10) / 10
								} from ${count} ratings.`,
								placement: 'left'
							}}
							class="flex gap-2 items-center justify-center"
						>
							<div class="text-4xl font-display">
								{enjoyment !== '-' ? Math.round(Number(enjoyment)) : enjoyment}
							</div>
							<IconoirMagicWand />
						</button>
					</div>
				</div>
			</div>
		</ParentBox>
	</div>
	<div>
		<ParentBox>
			<div class="flex flex-col items-center gap-8 w-72">
				<div class="flex flex-col w-full items-center gap-2">
					<div>Your Rating</div>
					<div class="flex flex-col gap-2 justify-center items-center w-full">
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
							on:click={() => handleRatingUpdate()}
							class="text-xl bg-stone-200 text-black p-2 px-4 rounded-full">Update</button
						>
					</div>
				</div>
				<div class="flex flex-col gap-2 w-full items-center">
					<div>Your Attempts</div>
					<div id="scrollbox" class="flex flex-col gap-2 overflow-y-scroll h-72 w-full text-left">
						{#each userRuns as { runId, runName, deathCount, runTimeString }}
							<button on:click={() => goto(`/runs/${runId}`)} class="flex items-center">
								<div class="flex flex-col">
									<div class="text-base">{runName}</div>
									<div class="text-sm opacity-60 text-left">{runTimeString}</div>
								</div>
								<div class="grow" />
								<div class="pr-2">{deathCount}</div>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</ParentBox>
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
