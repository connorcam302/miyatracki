<script lang="ts">
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{#if $page.url.pathname !== '/auth'}
	<div>
		{#if session}
			<p>Logged in as {session.user.email}</p>
			<button on:click={() => supabase.auth.signOut()}>Sign out</button>
		{:else}
			<button on:click={() => goto('/auth')}>Sign in</button>
		{/if}
	</div>
{/if}
<slot />
