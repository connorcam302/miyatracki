<script lang="ts">
	import { goto } from '$app/navigation';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import MaterialSymbolsHeartBroken from 'virtual:icons/material-symbols/heart-broken';
	import IconoirRulerCombine from 'virtual:icons/iconoir/ruler-combine';
	import Loading from '$lib/icons/Loading.svelte';
	import AlertList from '$lib/components/AlertList.svelte';
	import tippy from 'sveltejs-tippy';
	import { onMount } from 'svelte';
	export let bosses, userData, gameId;

	$: userRatings = null;
	$: userRatingsSet = false;
	const getUserRatings = async () => {
		if (userData) {
			const userRatingsData = await fetch(`/api/game/${gameId}/user/${userData.id}`)
				.then((res) => res.json())
				.then((data) => data.data);

			bosses = bosses.map((boss) => {
				const userRating = userRatingsData.find((rating) => rating.bossId === boss.bossId) ?? {
					difficultyRating: null,
					enjoymentRating: null
				};
				return {
					...boss,
					...userRating
				};
			});
			bosses.forEach((boss) => {
				boss.difficultyRatingText = boss.difficultyRating;
				boss.enjoymentRatingText = boss.enjoymentRating;
			});
			userRatingsSet = true;
		}
	};

	onMount(() => {
		getUserRatings();
	});

	let sortColumn: string = '';
	let sortOrder: 'asc' | 'desc' = 'asc';

	function sortBy(column: string) {
		if (sortColumn === column) {
			sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortOrder = 'asc';
		}

		bosses = bosses.sort((a, b) => {
			let aValue, bValue;
			switch (column) {
				case 'deaths':
					aValue = a.deaths !== null ? Number(a.deaths) : -Infinity;
					bValue = b.deaths !== null ? Number(b.deaths) : -Infinity;
					break;
				case 'difficultyRating':
					aValue = a.difficultyRating !== null ? Number(a.difficultyRating) : -Infinity;
					bValue = b.difficultyRating !== null ? Number(b.difficultyRating) : -Infinity;
					break;
				case 'enjoymentRating':
					aValue = a.enjoymentRating !== null ? Number(a.enjoymentRating) : -Infinity;
					bValue = b.enjoymentRating !== null ? Number(b.enjoymentRating) : -Infinity;
					break;
				case 'combinedRating':
					aValue = a.combinedRating;
					bValue = b.combinedRating;
					break;
				default:
					aValue = a.bossName;
					bValue = b.bossName;
			}

			if (aValue < bValue) {
				return sortOrder === 'asc' ? -1 : 1;
			} else if (aValue > bValue) {
				return sortOrder === 'asc' ? 1 : -1;
			} else {
				return 0;
			}
		});
	}

	const updateRating = async (
		bossId: number,
		difficultyRating: number,
		enjoymentRating: number,
		ratingType: string
	) => {
		const bossIndex = bosses.findIndex((boss) => boss.bossId === bossId);

		const response = await fetch(
			`/api/boss/${bossId}/user/${userData.id}?difficulty=${difficultyRating}&enjoyment=${enjoymentRating}`,
			{
				method: 'POST'
			}
		).then(() => {
			if (ratingType === 'difficulty') {
				bosses[bossIndex].difficultyRating = difficultyRating;
				bosses[bossIndex].difficultyRatingText = '✓';
				setTimeout(() => {
					bosses[bossIndex].difficultyRatingText = difficultyRating;
				}, 1000);
			} else {
				bosses[bossIndex].enjoymentRating = enjoymentRating;
				bosses[bossIndex].enjoymentRatingText = '✓';
				setTimeout(() => {
					bosses[bossIndex].enjoymentRatingText = enjoymentRating;
				}, 1000);
			}
		});
	};

	$: statState = 'averages';
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-4 px-4 justify-center items-center">
		<div class="flex flex-wrap gap-4 grow justify-center">
			<div class="flex flex-col gap-4">
				<div class="flex gap-4 justify-center">
					<button
						class="text-xl border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-36"
						style={statState === 'averages'
							? 'background-color: #F05E1B; border-color: #F05E1B'
							: ''}
						on:click={() => (statState = 'averages')}>Averages</button
					>
					<button
						class="text-xl border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-36"
						style={statState === 'user' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
						on:click={() => (statState = 'user')}>Your Ratings</button
					>
				</div>
				{#if statState === 'user' && !userRatingsSet}
					<div class="text-center text-2xl">Log in to rate bosses</div>
				{:else}
					<div class="text-stone-200 bg-stone-800 rounded-lg p-2 border-stone-600 border-[1px]">
						<div class="overflow-auto" id="scrollbox">
							<table>
								<thead>
									<tr>
										<th class="w-52">
											<button on:click={() => sortBy('bossName')}> Name </button>
										</th>
										{#if statState === 'averages'}
											<th class="w-12">
												<button on:click={() => sortBy('deaths')}>
													<div
														class="flex justify-center"
														use:tippy={{
															content: ` Deaths`,
															placement: 'left'
														}}
													>
														<MaterialSymbolsHeartBroken />
													</div>
												</button>
											</th>
											<th class="w-12">
												<button on:click={() => sortBy('difficultyRating')}>
													<div
														class="flex justify-center"
														use:tippy={{
															content: `Difficulty Rating`,
															placement: 'left'
														}}
													>
														<IconoirGym />
													</div>
												</button>
											</th>
											<th class="w-12">
												<button on:click={() => sortBy('enjoymentRating')}>
													<div
														class="flex justify-center"
														use:tippy={{
															content: `Enjoyment Rating`,
															placement: 'left'
														}}
													>
														<IconoirMagicWand />
													</div>
												</button>
											</th>
											<th class="w-12">
												<button on:click={() => sortBy('combinedRating')}>
													<div
														class="flex justify-center"
														use:tippy={{
															content: `Overall Rating`,
															placement: 'left'
														}}
													>
														<IconoirRulerCombine />
													</div>
												</button>
											</th>
										{:else if statState === 'user'}
											<th class="md:flex gap-2 md:gap-0 justify-center hidden">
												<div class="grow flex justify-end md:justify-center">
													<IconoirGym />
												</div>
												<div class="grow flex justify-start md:justify-center">
													<IconoirMagicWand />
												</div>
											</th>
										{/if}
									</tr>
								</thead>
								<tbody>
									{#each bosses as boss, i}
										<tr
											class={`${i !== bosses.length - 1 ? 'border-b-[1px] border-stone-600' : ''}`}
										>
											<td class="truncate py-1">
												<button
													class=" text-sm md:text-base text-left truncate hover:text-stone-400 duration-200 max-w-32 md:max-w-48"
													on:click={() => goto(`/boss/${boss.bossId}`)}
												>
													{boss.bossName}
												</button>
											</td>
											{#if statState === 'averages'}
												<td class="text-center">
													{boss.deaths !== null ? Math.round(Number(boss.deaths) * 10) / 10 : '-'}
												</td>
												<td class="text-center">
													{boss.difficultyRating !== null
														? Math.round(Number(boss.difficultyRating) * 10) / 10
														: '-'}
												</td>
												<td class="text-center">
													{boss.enjoymentRating !== null
														? Math.round(Number(boss.enjoymentRating) * 10) / 10
														: '-'}
												</td>
												<td class="text-center">
													{boss.combinedRating !== null
														? Math.round(Number(boss.combinedRating))
														: '-'}
												</td>
											{:else if statState === 'user'}
												{#if userRatingsSet}
													<td class="px-2">
														<div class="flex flex-col md:flex-row gap-2">
															<div class="flex gap-2 px-2 items-center">
																<IconoirGym />
																<input
																	type="range"
																	class="accent-ember"
																	id="enjoyment"
																	min="0"
																	max="10"
																	bind:value={boss.difficultyRating}
																	on:change={() =>
																		updateRating(
																			boss.bossId,
																			boss.difficultyRating,
																			boss.enjoymentRating,
																			'difficulty'
																		)}
																/>
																{#if boss.difficultyRating === null}
																	<div class="w-6 text-center">-</div>
																{:else if boss.difficultyRating === 'loading'}
																	<div class="w-6 text-center"><Loading /></div>
																{:else}
																	<div class="w-6 text-center">{boss.difficultyRatingText}</div>
																{/if}
															</div>
															<div class="flex gap-2 px-2 items-center">
																<IconoirMagicWand />
																<input
																	type="range"
																	class="accent-ember"
																	id="enjoyment"
																	min="0"
																	max="10"
																	bind:value={boss.enjoymentRating}
																	on:change={() =>
																		updateRating(
																			boss.bossId,
																			boss.difficultyRating,
																			boss.enjoymentRating,
																			'enjoyment'
																		)}
																/>
																{#if boss.enjoymentRating === null}
																	<div class="w-6 text-center">-</div>
																{:else if boss.enjoymentRating === 'loading'}
																	<div class="w-6 text-center"><Loading /></div>
																{:else}
																	<div class="w-6 text-center">{boss.enjoymentRatingText}</div>
																{/if}
															</div>
														</div>
													</td>
												{:else}
													<td class="px-2">
														<div class="flex flex-col md:flex-row gap-2">
															<div class="flex gap-2 px-2 items-center">
																<IconoirGym />
																<input
																	type="range"
																	class="accent-ember"
																	id="enjoyment"
																	min="0"
																	max="10"
																/>
																<div class="w-6 text-center">-</div>
															</div>
															<div class="flex gap-2 px-2 items-center">
																<IconoirMagicWand />
																<input
																	type="range"
																	class="accent-ember"
																	id="enjoyment"
																	min="0"
																	max="10"
																/>
																<div class="w-6 text-center">-</div>
															</div>
														</div>
													</td>
												{/if}
											{/if}
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	#scrollbox::-webkit-scrollbar {
		width: 4px;
	}

	#scrollbox::-webkit-scrollbar-thumb {
		background-color: #e7e5e4;
		border-radius: 64px;
	}

	thead th {
		position: sticky;
		top: 0;
		background-color: #292524;
	}
</style>
