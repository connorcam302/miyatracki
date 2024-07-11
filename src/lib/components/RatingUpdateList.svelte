<script>
	import { onMount, onDestroy } from 'svelte';
	export let bossName;
	export let ratingType;
	export let value;
	export let onDismiss;

	let timeout;

	// Automatically dismiss the alert after 5 seconds
	onMount(() => {
		timeout = setTimeout(() => {
			onDismiss();
		}, 5000);
	});

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<div class="relative p-4 mb-4 border border-gray-300 bg-gray-100 rounded">
	<strong>{bossName}</strong>
	<p>{ratingType}: {value}</p>
	<button on:click={onDismiss} class="absolute top-1 right-1 text-red-500 hover:text-red-700">
		✖
	</button>
</div>
