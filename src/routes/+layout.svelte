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

	let { supabase, session, userData, runs } = data;
	$: ({ supabase, session, userData, runs } = data);

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
		<div class="px-2 py-5 text-lg text-stone-200 border-stone-700 border-b-[1px]">
			<div class="min-w-screen flex mx-auto">
				<div class="flex-1 flex justify-start items-center">
					<div class="flex">
						<div class="pr-2">
							<Flame />
						</div>
						{#key visible}
							<button
								class="mr-3 text-4xl font-bold font-display"
								on:click={() => mobileNavigate('/')}>miyatracki</button
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
		<div class="grow flex" in:fade={{ delay: 120, duration: 250 }}>
			<div class="text-stone-300">
				<div class="hidden md:flex flex-col h-full">
					{#if session && userData}
						<div class="border-stone-700 border-[1px] border-t-0 border-l-0 p-2 max-w-48">
							<div class="flex flex-col">
								<div class="opacity-65 pb-1">Your Runs</div>
								{#each runs.slice(0, 3) as run}
									{#if data.url == `/runs/${run.runId}`}
										<button
											on:click={() => goto(`/runs/${run.runId}`)}
											class="truncate text-[#FFA500] text-left"
											style="color: #FFA500">{run.runName}</button
										>
									{:else}
										<button
											on:click={() => goto(`/runs/${run.runId}`)}
											class="truncate transition duration-200 hover:text-ember text-left"
											>{run.runName}</button
										>
									{/if}
								{/each}
								{#if runs.length === 4}
									<button
										on:click={() => goto('/runs/all')}
										class="truncate transition duration-200 hover:text-ember text-left"
										>All Runs</button
									>
								{/if}
							</div>
						</div>
					{/if}

					<div class="border-stone-700 border-[1px] border-t-0 border-l-0 p-2 max-w-48">
						<div class="opacity-65 pb-1">Games</div>
						<div class="flex flex-col text-left">
							<button
								on:click={() => goto('/games/1')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Demon's Souls</button
							>
							<button
								on:click={() => goto('/games/2')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Dark Souls</button
							>
							<button
								on:click={() => goto('/games/3')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Dark Souls II</button
							>
							<button
								on:click={() => goto('/games/4')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Bloodborne</button
							>
							<button
								on:click={() => goto('/games/5')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Dark Souls III</button
							>
							<button
								on:click={() => goto('/games/6')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Sekiro: Shadows Die Twice</button
							>
							<button
								on:click={() => goto('/games/7')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Elden Ring</button
							>
						</div>
					</div>

					<div class="border-stone-700 border-[1px] border-t-0 border-l-0 p-2 max-w-48">
						<div class="opacity-65 pb-1">Rankings</div>
						<div class="flex flex-col">
							<button
								on:click={() => goto('/rankings/difficulty')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Difficulty</button
							>
							<button
								on:click={() => goto('/rankings/enjoyment')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Enjoyment</button
							>
							<button
								on:click={() => goto('/rankings/deaths')}
								class="truncate transition duration-200 hover:text-ember text-left">Deaths</button
							>
							<button
								on:click={() => goto('/rankings/combined')}
								class="truncate transition duration-200 hover:text-ember text-left">Combined</button
							>
						</div>
					</div>
					<div
						class="border-stone-700 border-[1px] border-t-0 border-l-0 border-b-0 px-2 max-w-48 truncate grow flex flex-col"
					>
						<div class="grow" />
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
							<div class="flex flex-col">
								<div class="flex justify-center text-xs">miyatracki</div>
								<div class="flex justify-center text-xs">Connor Campbell</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<slot />
		</div>
	{/key}
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
			transition:fly={{ x: -1000, duration: 500 }}
			class="absolute opacity-100 inset-y-0 top-0 h-screen w-72 bg-stone-900  p-4 text-stone-200"
		>
			<div class="text-3xl w-full h-full max-h-screen overflow-auto">
				<div class="flex items-center align-middle border-b-[1px] border-stone-700 pb-2">
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
				<div class="text-lg">
					{#if session && userData}
						<div class="border-stone-700 border-b-[1px] p-2 max-w-72">
							<div class="flex flex-col">
								<div class="opacity-65 pb-1">Your Runs</div>
								{#each runs.slice(0, 3) as run}
									<button
										on:click={() => goto(`/runs/${run.id}`)}
										class="truncate transition duration-200 hover:text-ember text-left"
										>{run.runName}</button
									>
								{/each}
								{#if runs.length === 4}
									<button
										on:click={() => goto('/runs/all')}
										class="truncate transition duration-200 hover:text-ember text-left"
										>All Runs</button
									>
								{/if}
							</div>
						</div>
					{/if}

					<div class="border-stone-700 border-b-[1px] p-2 max-w-72">
						<div class="opacity-65 pb-1">Games</div>
						<div class="flex flex-col text-left">
							<button
								on:click={() => goto('/games/1')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Demon's Souls</button
							>
							<button
								on:click={() => goto('/games/2')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Dark Souls</button
							>
							<button
								on:click={() => goto('/games/3')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Dark Souls II</button
							>
							<button
								on:click={() => goto('/games/4')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Bloodborne</button
							>
							<button
								on:click={() => goto('/games/5')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Dark Souls III</button
							>
							<button
								on:click={() => goto('/games/6')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Sekiro: Shadows Die Twice</button
							>
							<button
								on:click={() => goto('/games/7')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Elden Ring</button
							>
						</div>
					</div>

					<div class="border-stone-700 border-b-[1px] p-2 max-w-72">
						<div class="opacity-65 pb-1">Rankings</div>
						<div class="flex flex-col">
							<button
								on:click={() => goto('/rankings/difficulty')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Difficulty</button
							>
							<button
								on:click={() => goto('/rankings/enjoyment')}
								class="truncate transition duration-200 hover:text-ember text-left"
								>Enjoyment</button
							>
							<button
								on:click={() => goto('/rankings/deaths')}
								class="truncate transition duration-200 hover:text-ember text-left">Deaths</button
							>
							<button
								on:click={() => goto('/rankings/combined')}
								class="truncate transition duration-200 hover:text-ember text-left">Combined</button
							>
						</div>
					</div>
					<div class="px-2 max-w-72 truncate grow flex flex-col">
						<div class="grow" />
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
