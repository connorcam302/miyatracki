<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Flame from '$lib/components/Flame.svelte';

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
			<div class="pr-2">
				<Flame />
			</div>
			<div class="my-auto flex grow gap-3">
				<button id class="mr-3 text-[#ffdc01] text-3xl" on:click={() => goto('/')}
					>miyatracki</button
				>
				<button id="link" class="text-3xl" data-text="link1">link1</button>
				<button id="link" class="text-3xl" data-text="link2">link2</button>
				<button id="link" class="text-3xl" data-text="link3">link3</button>
				<div class="flex-auto grow" />
				<div class="flex items-center gap-2">
					{#if session}
						<img src={userData.profilePicture} class="object-cover h-8 w-8" alt="profile" />
						<button on:click={() => supabase.auth.signOut()}>sign out</button>
					{:else}
						<button on:click={() => goto('/auth')}>sign in</button>
					{/if}
				</div>
			</div>
		</div>
	{/if}
	<slot />
</div>

<style>
	#link {
		display: inline-block;
		vertical-align: top;
		position: relative;
		line-height: 36px;
		cursor: pointer;
		color: rgb(240, 94, 27);
	}

	#link:before {
		transition: height 0.5s ease-in-out;
		content: attr(data-text);
		position: absolute;
		overflow: hidden;
		color: #a8a29e;
		height: 36px;
		left: 0;
		top: 0;
	}

	#link:hover:before {
		height: 0;
	}
</style>
