<script>
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';

	export let bosses = [];

	let chartCanvas;

	onMount(() => {
		const enjoymentCounts = Array(11).fill(0);
		const difficultyCounts = Array(11).fill(0);

		bosses.forEach((boss) => {
			enjoymentCounts[boss.enjoymentRating]++;
			difficultyCounts[boss.difficultyRating]++;
		});

		const ctx = chartCanvas.getContext('2d');
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: Array.from({ length: 11 }, (_, i) => i.toString()),
				datasets: [
					{
						label: 'Enjoyment Rating',
						data: enjoymentCounts,
						backgroundColor: '#14b8a695', // Bright Green
						borderColor: '#14b8a6',
						borderWidth: 1
					},
					{
						label: 'Difficulty Rating',
						data: difficultyCounts,
						backgroundColor: '#ef444495', // Strong Blue
						borderColor: '#ef4444',
						borderWidth: 1
					}
				]
			},
			options: {
				indexAxis: 'y',
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					y: {
						reverse: true,
						title: {
							display: false,
							text: 'Count of Bosses'
						}
					},
					x: {
						beginAtZero: true,
						title: {
							display: false,
							text: 'Rating'
						}
					}
				}
			}
		});
	});
</script>

<canvas bind:this={chartCanvas} height="400" />

<style>
	canvas {
		display: block;
		margin: 0 auto;
	}
</style>
