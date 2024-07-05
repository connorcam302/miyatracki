<script lang="ts">
	import RunsPage from './RunsPage.svelte';
	import BossesPage from './BossesPage.svelte';
	import RankingsPage from './RankingsPage.svelte';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import MaterialSymbolsHeartBroken from 'virtual:icons/material-symbols/heart-broken';
	import IconoirRulerCombine from 'virtual:icons/iconoir/ruler-combine';

	export let data = [];
	const { game, bosses, runs, userData } = data;
	console.log(data);

	$: pageState = 'bosses';
</script>

<div class="flex grow w-full flex-col gap-4 py-2">
	<div class="flex flex-col gap-2 border-b-[1px] border-stone-600 py-2">
		<div class="text-4xl font-title text-center">
			{game.gameTitle}
		</div>
		<div class="flex gap-4 justify-center">
			<button
				class="text-xl border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-28"
				style={pageState === 'runs' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
				on:click={() => (pageState = 'runs')}>Runs</button
			>
			<button
				class="text-xl border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-28"
				style={pageState === 'bosses' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
				on:click={() => (pageState = 'bosses')}>Bosses</button
			>
			<button
				class="text-xl border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-28"
				style={pageState === 'rankings' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
				on:click={() => (pageState = 'rankings')}>Rankings</button
			>
		</div>
	</div>
	{#if pageState === 'runs'}
		<RunsPage {runs} />
	{:else if pageState === 'bosses'}
		<BossesPage {bosses} {userData} gameId={game.gameId} />
	{:else if pageState === 'rankings'}
		<RankingsPage {bosses} {runs} />
	{/if}
</div>
