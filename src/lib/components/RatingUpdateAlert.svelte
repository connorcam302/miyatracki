<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
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

<div
	class="relative p-4 mb-4 border-ember border-[1px] bg-stone-800 rounded-xl"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div>{bossName} {ratingType} updated to {value}</div>
	<button on:click={onDismiss} class="absolute top-1 right-1 text-red-500 hover:text-red-700">
		✖
	</button>
</div>
