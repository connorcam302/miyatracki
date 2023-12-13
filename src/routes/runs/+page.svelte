<script>
	import PlusIcon from 'virtual:icons/iconoir/plus-circle-solid';
	import { fly, fade } from 'svelte/transition';
	import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
	import ParentBox from '$lib/components/ParentBox.svelte';
	import RunMini from '$lib/components/RunMini.svelte';

	export let data;

	const { games, userData, runs } = data;
	console.log(games, userData, runs);

	let nameValue;
	let experienceValue = 0;
	let gameValue = 'Select a Game';
	let error = '';

	const experienceDescription = new Map();
	experienceDescription.set(0, 'Your first playthrough of any souls-like game.');
	experienceDescription.set(1, 'Your first playthrough of this game.');
	experienceDescription.set(2, 'You have played this game once before.');
	experienceDescription.set(3, 'You have played this game multiple times before.');

	const regenerateName = () => {
		nameValue = uniqueNamesGenerator({
			dictionaries: [adjectives, colors, animals],
			separator: ' ',
			style: 'capital'
		});
	};

	regenerateName();

	const handleSubmit = () => {
		if (gameValue === 'Select a Game') {
			error = 'Please select a game.';
			return;
		}
		if (userData.id === undefined) {
			error = 'Please log in to create a run.';
			return;
		}
		error = '';
		const formData = {
			id: userData.id,
			name: nameValue,
			game: gameValue,
			experience: experienceValue
		};

		const data = Object.keys(formData)
			.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
			.join('&');

		fetch(`/api/runs/new?${data}`, {
			method: 'POST'
		})
			.then((res) => {
				if (res.status === 200) {
					toggleVisible();
				}
			})
			.catch((err) => {
				error = 'error';
				console.log(err);
			});
	};

	let visible = false;

	function toggleVisible() {
		visible = !visible;
	}
</script>

<div class>
	<button on:click={toggleVisible}>
		<div class="rounded-[40px] bg-stone-600 p-4 m-2 bg-opacity-[.30] min-w-[70px]">
			<div class="flex gap-2 items-center">
				<PlusIcon />
				Create Run
			</div>
		</div>
	</button>
	<ParentBox>
		{#each runs as run (run.id)}
			<RunMini {...run} />
		{/each}
	</ParentBox>
</div>

{#if visible}
	<div
		transition:fade={{ duration: 200 }}
		id="backdrop"
		class="h-screen fixed top-0 w-screen cursor-default"
		on:click|self={toggleVisible}
		on:keypress={(e) => e.key === 'Escape' && toggleVisible()}
		tabindex="0"
		role="button"
	>
		<div
			transition:fly={{ x: 1000, duration: 1000 }}
			class="absolute opacity-100 inset-y-0 right-0 w-72 bg-stone-200 rounded-l-xl py-8 px-4 text-black"
		>
			<form class="flex flex-col gap-3" on:submit|preventDefault={handleSubmit}>
				<div class="flex flex-col">
					<label for="runName" class="text-sm opacity-60">Run Name</label>
					<div class="px-2 bg-stone-100 rounded-full">
						<div class="mx-1">
							<input
								id="runName"
								class="w-full bg-stone-100"
								name="name"
								type="text"
								bind:value={nameValue}
							/>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<label for="gameDropdown" class="text-sm opacity-60">Game</label>
					<select id="gameDropdown" class="px-2 bg-stone-100 rounded-full" bind:value={gameValue}>
						<option selected="true" disabled="disabled">Select a Game</option>
						{#each games as game (game.gameId)}
							<option value={game.gameId}>{game.gameTitle}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-col">
					<label for="experience" class="text-sm opacity-60">Experience Level</label>
					<input
						type="range"
						class="accent-ember"
						id="experience"
						min="0"
						max={experienceDescription.size - 1}
						bind:value={experienceValue}
					/>
					<div class="text-center">{experienceDescription.get(experienceValue)}</div>
				</div>
				{#key error}
					<div class="h-5 text-red-500 text-center">
						{error}
					</div>
				{/key}
				<button class="bg-stone-800 text-stone-200 rounded-3xl p-2">Start</button>
			</form>
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

	select {
		border-right: 8px solid transparent;
	}
</style>
