<script>
	import { getContext } from 'svelte';
	import ParentBox from '$lib/components/ParentBox.svelte';
	import MdiTallyMark1 from 'virtual:icons/mdi/tally-mark-1';
	import MdiTallyMark2 from 'virtual:icons/mdi/tally-mark-2';
	import MdiTallyMark3 from 'virtual:icons/mdi/tally-mark-3';
	import MdiTallyMark4 from 'virtual:icons/mdi/tally-mark-4';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import tippy from 'sveltejs-tippy';

	const props = {
		content: "<span class='tooltip'>Intermediate</span>",
		allowHTML: true,
		placement: 'bottom'
	};

	export let data;

	$: viewport = getContext('viewport');

	$: difficulty = 10;
	$: enjoyment = 10;

	const { boss, supabase } = data;
</script>

<div class="text-2xl text-stone-200">
	<ParentBox>
		<div class="flex flex-col items-center gap-8">
			<div class="flex flex-col px-4 pt-2 items-center">
				<div class="h-64 w-64 bg-red-500" />
				<div>Lorem ipsum dolor sit amet</div>
				<div class="text-lg opacity-50">Lorem ipsum</div>
			</div>
			<div class="flex flex-col w-full items-center gap-1">
				<div>Average Deaths</div>
				<div class="flex justify-center items-center w-full px-2">
					<div class="grow flex flex-col items-center">
						<button use:tippy={{ content: 'Beginner', placement: 'left' }}>
							<MdiTallyMark1 />
						</button>
						<div>12</div>
					</div>
					<div class="grow flex flex-col items-center">
						<button use:tippy={{ content: 'Novice', placement: 'left' }}>
							<MdiTallyMark2 />
						</button>
						<div>12</div>
					</div>
					<div class="grow flex flex-col items-center">
						<button use:tippy={{ content: 'Intermediate', placement: 'left' }}>
							<MdiTallyMark3 />
						</button>
						<div>12</div>
					</div>
					<div class="grow flex flex-col items-center">
						<button use:tippy={{ content: 'Expert', placement: 'left' }}>
							<MdiTallyMark4 />
						</button>
						<div>12</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col w-full items-center">
				<div>Rating</div>
				<div class="flex w-full items-center justify-center">
					<button
						use:tippy={{ content: 'Difficulty', placement: 'left' }}
						class="flex gap-2 items-center justify-center"
					>
						<IconoirGym />
						<div class="text-4xl font-display">10</div>
					</button>
					<div class="w-32" />
					<button
						use:tippy={{ content: 'Enjoyment', placement: 'left' }}
						class="flex gap-2 items-center justify-center"
					>
						<div class="text-4xl font-display">10</div>
						<IconoirMagicWand />
					</button>
				</div>
			</div>
		</div>
	</ParentBox>
	<ParentBox>
		<div class="flex flex-col items-center gap-8">
			<div>Your Rating</div>
			<div class="flex w-full gap-4">
				<div class="flex flex-col w-full">
					<label for="experience" class="text-sm opacity-60">Difficulty</label>
					<input
						type="range"
						class="accent-ember"
						id="enjoyment"
						min="0"
						max="10"
						bind:value={difficulty}
					/>
				</div>
				<div>{difficulty}</div>
			</div>

			<div class="flex w-full gap-4">
				<div class="flex flex-col w-full">
					<label for="enjoyment" class="text-sm opacity-60">Enjoyment</label>
					<input
						type="range"
						class="accent-ember"
						id="enjoyment"
						min="0"
						max="10"
						bind:value={enjoyment}
					/>
				</div>
				<div class="text-title align-text-bottom align-bottom">{enjoyment}</div>
			</div>
			<div>Your Attempts</div>
		</div>
	</ParentBox>
</div>
