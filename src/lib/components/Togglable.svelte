<script>
	export let selected;
</script>

{#if selected === 'true'}
	<div class="rounded-[40px] bg-stone-200 text-stone-800 p-4 m-2 min-w-[70px]">
		<slot />
	</div>
{:else}
	<div class="rounded-[40px] bg-stone-600 p-4 m-2 bg-opacity-[.30] min-w-[70px]">
		<slot />
	</div>
{/if}
