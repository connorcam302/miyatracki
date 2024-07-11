<script lang="ts">
	import BossScatterGraph from '$lib/components/BossScatterGraph.svelte';

	export let data = [];
	const { bossByGame } = data;
	console.log(bossByGame);
</script>

<div>
	<BossScatterGraph data={bossByGame} />
</div>
