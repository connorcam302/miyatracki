<script lang="ts">
	import BossScatterGraph from '$lib/components/BossScatterGraph.svelte';

	export let data = [];
	const { bossByGame } = data;
</script>

<div>
	<BossScatterGraph data={bossByGame} />
</div>
