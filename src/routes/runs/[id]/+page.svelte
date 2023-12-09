<script>
	export let data;
	import ParentBox from '$lib/components/ParentBox.svelte';
	import ChildBox from '$lib/components/ChildBox.svelte';
	import IconoirSearch from 'virtual:icons/iconoir/search';

	const { run, bosses, user } = data;
	let bossList = bosses;

	console.log(bosses);

	let searchBoss = null;
	const searchBossesByName = (allBosses, searchString) => {
		const lowerSearchString = searchString.toLowerCase();

		return allBosses.filter((boss) => boss.name.toLowerCase().includes(lowerSearchString));
	};
</script>

<div>
	<div class="flex">
		<ChildBox>
			<div class="flex flex-col gap-2 w-72 pr-2">
				<div>
					<IconoirSearch />
					<input
						type="text"
						placeholder="Seach bosses..."
						bind:value={searchBoss}
						on:input={() => (bossList = searchBossesByName(bosses, searchBoss))}
						class="px-2 rounded-xl bg-stone-700"
					/>
					{#if bossList.length === 0}
						<div>No bosses found</div>
					{/if}
					{#each bossList as boss}
						<div>{boss.name}</div>
					{/each}
				</div>
			</div></ChildBox
		>
	</div>
</div>
