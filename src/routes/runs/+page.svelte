<script>
	import PlusIcon from 'virtual:icons/iconoir/plus-circle-solid';
	import IconoirSearch from 'virtual:icons/iconoir/search';
	import IconoirNavArrowRight from 'virtual:icons/iconoir/nav-arrow-right';
	import IconoirShareAndroid from 'virtual:icons/iconoir/share-android';
	import IconoirUser from 'virtual:icons/iconoir/user';
	import IconoirGamepad from 'virtual:icons/iconoir/gamepad';
	import IconoirGraphUp from 'virtual:icons/iconoir/graph-up';
	import { fly, fade } from 'svelte/transition';
	import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
	import { truncateString } from '$lib/functions';
	import ParentBox from '$lib/components/ParentBox.svelte';
	import RunMini from '$lib/components/RunMini.svelte';
	import { goto } from '$app/navigation';

	export let data;

	const { games, userData, runs } = data;

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

	let placeholderText = '';
	const typeWriter = () => {
		let txt = 'test text';
		const speed = 100;
		let i = 0;
		let direction;
		const type = () => {
			if (i === 0) {
				txt = uniqueNamesGenerator({
					dictionaries: [adjectives, colors, animals],
					separator: ' ',
					style: 'capital'
				});

				direction = 1;
			}
			if (i === txt.length) {
				direction = -1;
			}
			if (direction === 1) {
				placeholderText += txt.charAt(i);
				i++;
				setTimeout(type, speed);
			} else {
				placeholderText = placeholderText.slice(0, -1);
				i--;
				setTimeout(type, speed);
			}
		};
		type();
	};
	typeWriter();

	let searchTerms = '';
	$: searchError = '';
	$: returnedRuns = null;
	const goToRun = async (search) => {
		returnedRuns = null;
		if (search.length < 5) {
			searchError = 'Please enter at least 5 characters.';

			return;
		}
		const runs = await fetch(`/api/runs/search?terms=${search}`)
			.then((res) => res.json())
			.then((data) => data.data);

		if (runs.length === 0) {
			searchError = 'No runs found.';
			return;
		}

		if (runs.length === 1) {
			goto(`/runs/${runs[0].id}`);
			return;
		}

		returnedRuns = runs;

		console.log(runs);
		return;
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			goToRun(searchTerms);
		}
	};

	let visible = false;
	function toggleVisible() {
		visible = !visible;
	}
</script>

<div>
	<div class="flex flex-wrap justify-center items-center gap-4">
		<button on:click={toggleVisible} class="h-full">
			<div class="rounded-[40px] bg-stone-600 py-2 px-4 bg-opacity-[.30] min-w-[70px]">
				<div class="flex gap-2 items-center">
					<PlusIcon />
					Create Run
				</div>
			</div>
		</button>
		<div
			class="flex text-xl bg-stone-600 bg-opacity-[.30] rounded-full pl-2 items-center max-w-screen-sm"
		>
			<div>
				<IconoirSearch />
			</div>
			<input
				class="bg-transparent pl-2 text-stone-200 grow w-auto md:w-[480px]"
				placeholder={placeholderText}
				bind:value={searchTerms}
				on:keypress={handleKeyPress}
			/>
			<button
				class="bg-stone-200 text-stone-700 rounded-full p-2 px-4 hover:bg-stone-400 transition-all text-xl"
				on:click={() => goToRun(searchTerms)}
			>
				<IconoirNavArrowRight />
			</button>
		</div>
	</div>
	<div class="h-8 relative">
		{#key searchError}
			<div
				class="text-red-500 w-full text-center absolute"
				in:fade={{ delay: 60, duration: 150 }}
				out:fade={{ duration: 50 }}
			>
				{searchError}
			</div>
		{/key}
	</div>
	{#if returnedRuns}
		<div class="flex flex-wrap justify-center">
			{#each returnedRuns as { id, username, game, name, profilePicture, experienceTitle, experienceColour }, i}
				<div key={i}>
					<button
						on:click={() => goto(`/runs/${id}`)}
						class="rounded-full bg-stone-700 py-3 px-3 pl-5 m-2 bg-opacity-[.30] w-[340px]"
					>
						<div class="flex gap-2 pl-4">
							<div class="flex flex-col text-sm">
								<div class="flex gap-1 items-center">
									<div><IconoirUser /></div>
									<div>{truncateString(username, 20)}</div>
								</div>
								<div class="flex gap-1 items-center">
									<div><IconoirGamepad /></div>
									<div>{game}</div>
								</div>
								<div class="flex gap-1 items-center">
									<div><IconoirShareAndroid /></div>
									<div>{truncateString(name, 20)}</div>
								</div>
								<div class="flex gap-1 items-center">
									<div><IconoirGraphUp /></div>
									<div style="color: {experienceColour}">{experienceTitle}</div>
								</div>
							</div>
							<div class="grow" />
							<div class="flex-0 flex-grow-0 h-20">
								<img class="rounded-full h-full w-full" src={profilePicture} alt="profile" />
							</div>
						</div>
					</button>
				</div>
			{/each}
		</div>
	{/if}
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
