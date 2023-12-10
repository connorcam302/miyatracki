<script>
	import ParentBox from '$lib/components/ParentBox.svelte';
	import ChildBox from '$lib/components/ChildBox.svelte';
	import Togglable from '$lib/components/Togglable.svelte';
	import { blur } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;

	let { gameData } = data;
	const allGames = gameData;
	let urlGame = $page.url.searchParams.get('game');
	let currentGame = allGames;
	let id = 0;

	if (urlGame) {
		id = parseInt(urlGame);
	}
	currentGame = allGames.filter((game) => {
		if (id === 0) {
			return allGames;
		} else {
			return game.id === id;
		}
	});

	const setGame = (id) => {
		currentGame = allGames.filter((game) => {
			if (id === 0) {
				return allGames;
			} else {
				$page.url.searchParams.set('game', id);
				goto(`?${$page.url.searchParams.toString()}`);
				return game.id === id;
			}
		});
	};

	console.log(currentGame);
</script>

<div>
	<div class="flex flex-wrap justify-center text-stone-200">
		{#each allGames as game}
			{#if currentGame.length <= 1 && currentGame[0].id === game.id}
				<button on:click={() => setGame(0)}>
					<Togglable selected="true">
						<div class="text-xs flex flex-col mt-0.5">
							<div class="justify-center items-center">{game.name}</div>
						</div>
					</Togglable>
				</button>
			{:else}
				<button on:click={() => setGame(game.id)}>
					<Togglable selected="false">
						<div class="text-xs flex flex-col mt-0.5">
							<div class="justify-center items-center">{game.name}</div>
						</div>
					</Togglable>
				</button>
			{/if}
		{/each}
	</div>
	{#key currentGame}
		<div out:blur={{ duration: 400 }} in:blur={{ delay: 400, duration: 400 }}>
			{#each currentGame as game (game.id)}
				<ParentBox>
					<div class="text-2xl font-bold w-full m-2 text-center">{game.name}</div>
					{#each game.bosses as boss}
						<ChildBox>
							<div class="w-64 h-full flex flex-col pb-2">
								<div class="pb-2 grow flex justify-center items-center">
									<div class="text-center text-xl w-full">
										{boss.bossName}
									</div>
								</div>
								<img
									class="w-52 h-52 mx-auto"
									src="https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/artorias.png"
									alt="boss"
								/>
							</div>
						</ChildBox>
					{/each}
				</ParentBox>
			{/each}
		</div>
	{/key}
</div>
