<script>
	import ParentBox from '$lib/components/ParentBox.svelte';
	import ChildBox from '$lib/components/ChildBox.svelte';
	import { blur } from 'svelte/transition';

	export let data;

	let { gameData } = data;
	const allGames = gameData;

	console.log(gameData);

	const setList = (e) => {
		gameData = allGames.filter((game) => {
			if (e === 'all') {
				return allGames;
			} else {
				return game.id === e;
			}
		});
	};
</script>

<div>
	<ParentBox>
		{#each allGames as game}
			<button on:click={() => setList(game.id)}>
				<ChildBox>
					<div class="text-xs flex flex-col mt-0.5">
						<div class="justify-center items-center">{game.name}</div>
					</div>
				</ChildBox>
			</button>
		{/each}
	</ParentBox>
	{#each gameData as game (game.id)}
			<div out:blur={{ duration: 400 }} in:blur={{ delay: 400, duration: 400 }}>
				<ParentBox>
					<div class="text-2xl font-bold w-full m-2">{game.name}</div>
					{#each game.bosses as boss}
						<ChildBox>
							<div class="w-64 h-full flex flex-col">
								<div class="pb-2 grow flex justify-center items-center">
									<div class="text-center text-xl w-full">
										{boss.bossName}
									</div>
								</div>
								<img
									class="w-64 h-64 mx-auto"
									src="https://epnhpyyerjkkyxartywd.supabase.co/storage/v1/object/public/boss-images/ds1/artorias.png"
									alt="boss"
								/>
							</div>
						</ChildBox>
					{/each}
				</ParentBox>
			</div>
	{/each}
</div>
