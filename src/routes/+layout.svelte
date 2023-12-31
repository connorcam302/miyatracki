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
	import IconoirMenu from 'virtual:icons/iconoir/menu';
	import IconoirXmark from 'virtual:icons/iconoir/xmark';
	import IconoirRunning from 'virtual:icons/iconoir/running';
	import IconoirBonfire from 'virtual:icons/iconoir/bonfire';
	import { fade, fly } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

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

	$: innerWidth = 0;
	$: innerHeight = 0;
	$: viewport = 'desktop';

	const handleViewport = (innerWidth) => {
		if (innerWidth > 1200) {
			viewport = 'desktop';
		} else if (innerWidth > 667) {
			viewport = 'tablet';
		} else {
			viewport = 'mobile';
		}
	};
	$: handleViewport(innerWidth);

	const viewportStore = writable();
	$: viewportStore.set(viewport);

	setContext('viewport', viewportStore);

	let visible = false;
	function toggleVisible() {
		visible = !visible;
	}

	const mobileNavigate = (destination) => {
		visible = false;
		goto(destination);
	};
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="min-h-screen flex flex-col">
	{#if $page.url.pathname !== '/auth'}
		<div class="px-2 py-5 text-lg text-stone-200">
			<div class="min-w-screen flex mx-auto">
				<div class="flex-1 flex justify-start items-center">
					<div class="flex absolute z-10">
						<div class="pr-2">
							<Flame />
						</div>
						{#key visible}
							<button
								class="mr-3 text-4xl font-bold font-display"
								on:click={() => mobileNavigate('/')}
								style="color: {!visible ? 'white' : 'black'}">miyatracki</button
							>
						{/key}
					</div>
				</div>
				{#if viewport === 'tablet' || viewport === 'mobile'}
					<div class="flex-1 flex justify-end items-center h-12">
						<div class="absolute z-20">
							<button
								class="text-3xl p-2"
								on:click={toggleVisible}
								style="color: {!visible ? 'white' : 'black'}"
							>
								{#if visible}
									<IconoirXmark />
								{:else}
									<IconoirMenu />
								{/if}
							</button>
						</div>
					</div>
				{:else}
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
								<button on:click={() => goto(`/user/${userData.id}`)}>
									<img
										src={userData.profilePicture}
										class="object-cover h-12 w-12 rounded-full"
										alt="profile"
										referrerpolicy="no-referrer"
									/>
								</button>
								<button
									on:click={() => supabase.auth.signOut()}
									class="bg-stone-700 rounded-full h-12 w-12"
								>
									<LogoutIcon class="mx-auto" />
								</button>
							{:else}
								<button
									on:click={() => goto('/auth')}
									class="bg-stone-700 rounded-full h-12 w-12 p-3"
									><LoginIcon class="mx-auto" />
								</button>
							{/if}
						</div>
					</div>
				{/if}
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

{#if visible}
	<div
		transition:fade={{ duration: 200 }}
		id="backdrop"
		class="fixed top-0 w-screen cursor-default h-screen"
		on:click|self={toggleVisible}
		on:keypress={(e) => e.key === 'Escape' && toggleVisible()}
		tabindex="0"
		role="button"
	>
		<div
			transition:fly={{ y: -1000, duration: 500 }}
			class="absolute opacity-100 inset-y-0 top-0 h-72 w-screen bg-stone-200 rounded-b-xl py-8 px-4 text-black"
		>
			<div class="text-3xl w-full mt-8">
				<div class="flex py-4 mx-2 items-center align-middle">
					{#if session && userData}
						<div class="flex gap-3 justify-center items-center">
							<img
								src={userData.profilePicture}
								class="object-cover h-12 w-12 rounded-full"
								alt="profile"
								referrerpolicy="no-referrer"
							/>
							<div class="align-bottom text-2xl">{userData.displayName}</div>
						</div>
						<div class="flex-1" />
						<button on:click={() => supabase.auth.signOut()} class="rounded-full h-12 w-12">
							<LogoutIcon class="mx-auto" />
						</button>
					{:else}
						<button
							on:click={() => goto('/auth')}
							class="flex justify-center items-center rounded-full h-12 w-12"
							><LoginIcon />
						</button>
						<button on:click={() => mobileNavigate('/auth')} class="my-auto text-2xl">Login</button>
					{/if}
				</div>
				<div class="flex flex-col justify-center">
					<div class="h-[1px] w-11/12 bg-stone-700 mx-auto rounded-full" />
					<div class="flex flex-col gap-4 pt-4 mx-4">
						{#each navItems as navItem}
							{#if url.includes(navItem.link)}
								<div class="flex gap-2">
									{#if navItem.name === 'Runs'}
										<IconoirRunning />
									{:else if navItem.name === 'Bosses'}
										<IconoirBonfire />
									{/if}
									<button class="text-3xl font-white" data-text={navItem.name}
										>{navItem.name}</button
									>
								</div>
							{:else}
								<div class="flex gap-2 opacity-50">
									{#if navItem.name === 'Runs'}
										<IconoirRunning />
									{:else if navItem.name === 'Bosses'}
										<IconoirBonfire />
									{/if}
									<button
										on:click={() => mobileNavigate(navItem.link)}
										class="text-3xl"
										data-text={navItem.name}>{navItem.name}</button
									>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	#backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
