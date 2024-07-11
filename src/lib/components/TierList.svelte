<script lang="ts">
	import tippy from 'sveltejs-tippy';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import IconoirRulerCombine from 'virtual:icons/iconoir/ruler-combine';
	import { fade } from 'svelte/transition';

	type Boss = {
		bossId: number;
		bossName: string;
		bossImage: string;
		enjoymentRating: string;
		difficultyRating: string;
		deaths: string;
		combinedRating: number;
		ratingCount: number;
	};

	type Tier = {
		tierId: number;
		tierName: string;
		tierColour: string;
		tierOrder: number;
		tierContent: Boss[];
	};

	export let bosses: Boss[] = [];

	const tiers: Tier[] = [
		{
			tierId: 1,
			tierName: 'S',
			tierColour: 'bg-red-500',
			tierOrder: 1,
			tierContent: [],
			tierStart: 85
		},
		{
			tierId: 2,
			tierName: 'A',
			tierColour: 'bg-orange-500',
			tierOrder: 2,
			tierContent: [],
			tierStart: 75
		},
		{
			tierId: 3,
			tierName: 'B',
			tierColour: 'bg-yellow-500',
			tierOrder: 3,
			tierContent: [],
			tierStart: 65
		},
		{
			tierId: 4,
			tierName: 'C',
			tierColour: 'bg-green-500',
			tierOrder: 4,
			tierContent: [],
			tierStart: 50
		},
		{
			tierId: 5,
			tierName: 'D',
			tierColour: 'bg-cyan-500',
			tierOrder: 5,
			tierContent: [],
			tierStart: 30
		},
		{
			tierId: 6,
			tierName: 'E',
			tierColour: 'bg-blue-500',
			tierOrder: 6,
			tierContent: [],
			tierStart: 15
		},
		{
			tierId: 7,
			tierName: 'F',
			tierColour: 'bg-purple-500',
			tierOrder: 7,
			tierContent: [],
			tierStart: 0
		}
	];

	bosses = bosses.sort((a, b) => b.combinedRating - a.combinedRating);
	// put the bosses into tiers based on their combined rating
	bosses.forEach((boss) => {
		if (boss.ratingCount !== null && boss.ratingCount < 2) return;
		if (boss.combinedRating >= tiers[0].tierStart) {
			tiers[0].tierContent.push(boss);
		} else if (boss.combinedRating >= tiers[1].tierStart) {
			tiers[1].tierContent.push(boss);
		} else if (boss.combinedRating >= tiers[2].tierStart) {
			tiers[2].tierContent.push(boss);
		} else if (boss.combinedRating >= tiers[3].tierStart) {
			tiers[3].tierContent.push(boss);
		} else if (boss.combinedRating >= tiers[4].tierStart) {
			tiers[4].tierContent.push(boss);
		} else if (boss.combinedRating >= tiers[5].tierStart) {
			tiers[5].tierContent.push(boss);
		} else {
			tiers[6].tierContent.push(boss);
		}
	});
	$: console.log(bosses);
	console.log(tiers);
</script>

<div class="flex flex-col max-w-screen-lg">
	{#each tiers as tier, i}
		<div class="flex flex-col gap-2">
			<div class="flex border-[1px] border-stone-300">
				<div
					class="text-4xl text-center font-bold {tier.tierColour} p-2 w-20 min-w-20 min-h-32 flex items-center justify-center border-r-[1px] border-stone-300 font-title"
					use:tippy={{
						content: `Rating from ${tier.tierStart} to ${
							i == 0 ? 100 : tiers[i - 1].tierStart - 1
						}`,
						placement: 'right'
					}}
				>
					{tier.tierName}
				</div>
				{#key bosses}
					<div class="flex flex-wrap gap-1" in:fade={{ delay: 120, duration: 250 }}>
						{#each tier.tierContent as boss}
							<button>
								<img
									class="h-32 w-32"
									src={boss.bossImage}
									alt={boss.bossName}
									use:tippy={{
										content: `
                                        <div class="flex flex-col gap-2">
                                            <div class="text-lg">${boss.bossName}</div>
                                            <div class="flex gap-1 items-center">
                                                <div class='font-bold'>Difficulty:</div>
                                                <div>${
																									Math.round(boss.difficultyRating * 10) / 10
																								}</div>
                                            </div>
                                            <div class="flex gap-1 items-center">
                                                <div class='font-bold'>Enjoyment:</div>
                                                <div>${
																									Math.round(boss.enjoymentRating * 10) / 10
																								}</div>
                                            </div>

                                            <div class="flex gap-1 items-center">
                                                <div class='font-bold'>Rating:</div>
                                                <div>${Math.round(boss.combinedRating)}</div>
                                            </div>

                                        </div>`,
										placement: 'left',
										allowHTML: true
									}}
								/>
							</button>
						{/each}
					</div>
				{/key}
			</div>
		</div>
	{/each}
</div>
