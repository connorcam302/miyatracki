<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Flame from '$lib/components/Flame.svelte';
	import LogoutIcon from 'virtual:icons/iconoir/log-out';
	import LoginIcon from 'virtual:icons/iconoir/log-in';
	import BiGithub from 'virtual:icons/bi/github';
	import BiTwitterX from 'virtual:icons/bi/twitter-x';
	import BiLinkedin from 'virtual:icons/bi/linkedin';
	import { fade } from 'svelte/transition';

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

	$: url = $page.url.pathname;
</script>

<div class="min-h-screen flex flex-col">
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
							{#if url.includes(navItem.link)}
								<button
									on:click={() => goto(navItem.link)}
									class="text-3xl font-white"
									data-text={navItem.name}>{navItem.name}</button
								>
							{:else}
								<button
									on:click={() => goto(navItem.link)}
									id="link"
									class="text-3xl opacity-50"
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
	{#key data.url}
		<div
			class="grow max-w-screen-lg mx-auto flex flex-col justify-center"
			in:fade={{ delay: 120, duration: 250 }}
		>
			<slot />
		</div>
	{/key}
	<div class="flex flex-col gap-2 my-4">
		<div class="flex justify-center gap-4 text-xl">
			<a
				href="https://www.linkedin.com/in/connor-campbell-600265175/"
				class="hover:text-ember transition-all"><BiLinkedin /></a
			>
			<a href="https://twitter.com/TheColfox" class="hover:text-ember transition-all"
				><BiTwitterX /></a
			>
			<a href="https://github.com/connorcam302" class="hover:text-ember transition-all"
				><BiGithub /></a
			>
		</div>
		<div class="flex justify-center text-xs">miyatracki | Connor Campbell</div>
	</div>
</div>

<style>
	#page {
		background-color: hsla(106, 0%, 9%, 1);
		background-image: radial-gradient(at 20% 89%, hsla(19, 52%, 20%, 0.43) 0px, transparent 50%),
			radial-gradient(at 88% 23%, hsla(0, 0%, 20%, 1) 0px, transparent 50%),
			radial-gradient(at 33% 36%, hsla(42, 74%, 20%, 0.53) 0px, transparent 50%),
			radial-gradient(at 86% 73%, hsla(42, 74%, 20%, 0.53) 0px, transparent 50%);
	}
</style>
