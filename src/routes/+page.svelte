<script lang="ts">
	export let data;
</script>

{#if data.session}
	<p>client-side data fetching with RLS</p>
	<p>Hey, {data.session.user.id}</p>
{:else}
	<p>no session</p>
{/if}
