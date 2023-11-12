<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	let { supabase, session, userData } = data;
	$: ({ supabase, session, userData } = data);

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

<div class="bg-stone-700 min-h-screen relative">
	{#if $page.url.pathname !== '/auth'}
		<div class="bg-stone-800 px-2 h-10 text-lg text-stone-200 flex">
			<div class="my-auto flex grow gap-3">
				<span class="flex-none">miyatracki</span>
				<div class="flex-auto grow" />
				{#if session}
					<p>@{userData.displayName}</p>
					<img src={userData.profilePicture} class="object-cover h-8 w-8" />
					<button on:click={() => supabase.auth.signOut()}>sign out</button>
				{:else}
					<button on:click={() => goto('/auth')}>sign in</button>
				{/if}
			</div>
		</div>
	{/if}
	<slot />
</div>
