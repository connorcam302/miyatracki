<script>
	import ParentBox from '$lib/components/ParentBox.svelte';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import { goto } from '$app/navigation';

	export let data;

	const { user, runs, ratings } = data;
	const { displayName, profilePicture } = user;
</script>

<div class="flex flex-wrap w-full">
	<div class="flex flex-col">
		<ParentBox>
			<div class="flex flex-col mx-4 justify-center items-center gap-4">
				<img
					class="rounded-full w-56 h-56"
					src={profilePicture}
					alt={displayName}
					referrerpolicy="no-referrer"
				/>
				<div class="text-3xl font-display">{displayName}</div>
			</div>
		</ParentBox>
		<ParentBox>
			<div class="text-3xl font-display">Runs</div>
			<div id="scrollbox" class="flex flex-col gap-2 overflow-y-scroll h-72 w-full text-left">
				{#each runs as { runId, runName, runTimeString, game }}
					<button on:click={() => goto(`/runs/${runId}`)} class="flex items-center w-full">
						<div class="flex flex-col text-left">
							<div class="text-base">{runName}</div>
							<div class="text-sm opacity-60">{game}</div>
							<div class="text-sm opacity-60">{runTimeString}</div>
						</div>
					</button>
				{/each}
			</div>
		</ParentBox>
	</div>
	<div>
		<ParentBox>
			<div class="h-[654px] w-64">
				<div class="text-3xl font-display text-center">Ratings</div>
				<div id="scrollbox" class="flex flex-col gap-2 overflow-y-scroll h-72 w-full text-left">
					{#each ratings as { boss, bossId, enjoymentRating, difficultyRating, bossGame, ratingTimeString }}
						<button on:click={() => goto(`/boss/${bossId}`)} class="flex items-center w-full">
							<div class="flex w-full">
								<div class="flex flex-col text-left">
									<div class="text-base">{boss}</div>
									<div class="text-sm opacity-60">{bossGame}</div>
									<div class="text-sm opacity-60">{ratingTimeString}</div>
								</div>
								<div class="grow" />
								<div class="flex flex-col text-right">
									<div class="text-2xl flex gap-2 justify-center items-center">
										{enjoymentRating}
										<div><IconoirMagicWand /></div>
									</div>
									<div class="grow flex-1" />
									<div class="text-2xl flex gap-2 justify-center items-center">
										<div>{difficultyRating}</div>
										<div><IconoirGym /></div>
									</div>
								</div>
							</div>
						</button>
					{/each}
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
