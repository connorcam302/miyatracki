<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Flame from '$lib/components/Flame.svelte';
	import LogoutIcon from 'virtual:icons/iconoir/log-out';
	import LoginIcon from 'virtual:icons/iconoir/log-in';

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

	let navItems = [
		{
			name: 'Runs',
			link: '/runs'
		},
		{
			name: 'Bosses',
			link: '/boss'
		}
	];
</script>

<div class="min-h-screen">
	{#if $page.url.pathname !== '/auth'}
		<div class="px-2 py-5 text-lg text-stone-200">
			<div class="min-w-screen flex mx-auto">
				<div class="flex-1 flex justify-start items-center">
					<div class="flex">
						<div class="pr-2">
							<Flame />
						</div>
						<button id class="mr-3 text-4xl font-bold font-display" on:click={() => goto('/')}
							>miyatracki</button
						>
					</div>
				</div>
				<div class="flex-1 flex justify-center items-center">
					<div class="flex gap-10">
						{#each navItems as navItem}
							{#if navItem.link === $page.url.pathname}
								<button
									on:click={() => goto(navItem.link)}
									class="text-3xl font-white"
									data-text={navItem.name}>{navItem.name}</button
								>
							{:else}
								<button
									on:click={() => goto(navItem.link)}
									id="link"
									class="text-3xl"
									data-text={navItem.name}>{navItem.name}</button
								>
							{/if}
						{/each}
					</div>
				</div>
				<div class="flex-1 flex justify-end items-center">
					<div class="flex gap-3">
						{#if session && userData}
							<img
								src={userData.profilePicture}
								class="object-cover h-12 w-12 rounded-full"
								alt="profile"
							/>
							<button
								on:click={() => supabase.auth.signOut()}
								class="bg-stone-700 rounded-full h-12 w-12"
							>
								<LogoutIcon class="mx-auto" />
							</button>
						{:else}
							<button on:click={() => goto('/auth')} class="bg-stone-700 rounded-full h-12 w-12 p-3"
								><LoginIcon class="mx-auto" />
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="max-w-screen-lg mx-auto">
		<slot />
	</div>
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
		color: #78716c;
		height: 36px;
		left: 0;
		top: 0;
	}

	#link:hover:before {
		height: 0;
	}

	#page {
		background-color: hsla(106, 0%, 9%, 1);
		background-image: radial-gradient(at 20% 89%, hsla(19, 52%, 20%, 0.43) 0px, transparent 50%),
			radial-gradient(at 88% 23%, hsla(0, 0%, 20%, 1) 0px, transparent 50%),
			radial-gradient(at 33% 36%, hsla(42, 74%, 20%, 0.53) 0px, transparent 50%),
			radial-gradient(at 86% 73%, hsla(42, 74%, 20%, 0.53) 0px, transparent 50%);
	}
</style>
