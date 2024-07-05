<script lang="ts">
	import { goto } from '$app/navigation';
	import IconoirGym from 'virtual:icons/iconoir/gym';
	import IconoirMagicWand from 'virtual:icons/iconoir/magic-wand';
	import MaterialSymbolsHeartBroken from 'virtual:icons/material-symbols/heart-broken';
	import IconoirRulerCombine from 'virtual:icons/iconoir/ruler-combine';
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
				case 'avgDeaths':
					aValue = a.avgDeaths !== null ? Number(a.avgDeaths) : -Infinity;
					bValue = b.avgDeaths !== null ? Number(b.avgDeaths) : -Infinity;
					break;
				case 'avgDifficultyRating':
					aValue = a.avgDifficultyRating !== null ? Number(a.avgDifficultyRating) : -Infinity;
					bValue = b.avgDifficultyRating !== null ? Number(b.avgDifficultyRating) : -Infinity;
					break;
				case 'avgEnjoymentRating':
					aValue = a.avgEnjoymentRating !== null ? Number(a.avgEnjoymentRating) : -Infinity;
					bValue = b.avgEnjoymentRating !== null ? Number(b.avgEnjoymentRating) : -Infinity;
					break;
				case 'combinedAverageRating':
					aValue = a.combinedAverageRating;
					bValue = b.combinedAverageRating;
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

	$: statState = 'user';
	$: ratingType = 'difficulty';
</script>

<div class="flex flex-col gap-8">
	<div class="text-4xl text-center">Rankings</div>
	<div class="flex flex-col gap-4 px-4 justify-center items-center">
		<div class="flex flex-wrap gap-4 grow justify-center">
			<div class="flex flex-col gap-4">
				<div class="text-3xl">Stats</div>
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
											<button on:click={() => sortBy('avgDeaths')}>
												<div
													class="flex justify-center"
													use:tippy={{
														content: `Average Deaths`,
														placement: 'left'
													}}
												>
													<MaterialSymbolsHeartBroken />
												</div>
											</button>
										</th>
										<th class="w-12">
											<button on:click={() => sortBy('avgDifficultyRating')}>
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
											<button on:click={() => sortBy('avgEnjoymentRating')}>
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
											<button on:click={() => sortBy('combinedAverageRating')}>
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
									<tr class={`${i !== bosses.length - 1 ? 'border-b-[1px] border-stone-600' : ''}`}>
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
												{boss.avgDeaths !== null
													? Math.round(Number(boss.avgDeaths) * 10) / 10
													: '-'}
											</td>
											<td class="text-center">
												{boss.avgDifficultyRating !== null
													? Math.round(Number(boss.avgDifficultyRating) * 10) / 10
													: '-'}
											</td>
											<td class="text-center">
												{boss.avgEnjoymentRating !== null
													? Math.round(Number(boss.avgEnjoymentRating) * 10) / 10
													: '-'}
											</td>
											<td class="text-center">
												{boss.combinedAverageRating !== null
													? Math.round(Number(boss.combinedAverageRating))
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
															/>
															{#if boss.difficultyRating === null}
																<div class="w-6 text-center">-</div>
															{:else}
																<div class="w-6 text-center">{boss.difficultyRating}</div>
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
															/>
															{#if boss.difficultyRating === null}
																<div class="w-6 text-center">-</div>
															{:else}
																<div class="w-6 text-center">{boss.enjoymentRating}</div>
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
		z-index: 1;
		background-color: #292524;
	}
</style>
