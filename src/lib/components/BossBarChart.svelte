<script>
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	export let bosses = []; // Array of bosses

	let chart;
	let mode = 'enjoymentDifficulty';

	// Function to prepare data for bar chart
	function prepareBarData(bosses, mode) {
		let labels = bosses.map((boss) => boss.bossName);

		if (mode === 'enjoymentDifficulty') {
			let avgEnjoymentRating = bosses.map(
				(boss) => Math.round(parseFloat(boss.avgEnjoymentRating) * 10) / 10
			);
			let avgDifficultyRating = bosses.map(
				(boss) => Math.round(parseFloat(boss.avgDifficultyRating) * 10) / 10
			);

			return {
				labels: labels,
				datasets: [
					{
						label: 'Average Enjoyment Rating',
						data: avgEnjoymentRating,
						backgroundColor: '#14b8a695', // Bright Green
						borderColor: '#14b8a6',
						borderWidth: 1
					},
					{
						label: 'Average Difficulty Rating',
						data: avgDifficultyRating,
						backgroundColor: '#ef444495', // Strong Blue
						borderColor: '#ef4444',
						borderWidth: 1
					}
				]
			};
		} else if (mode === 'deaths') {
			let avgDeaths = bosses.map((boss) => Math.round(parseFloat(boss.avgDeaths) * 10) / 10);

			return {
				labels: labels,
				datasets: [
					{
						label: 'Average Deaths',
						data: avgDeaths,
						backgroundColor: '#f05e1b95', // Orange
						borderColor: '#f05e1b',
						borderWidth: 1
					}
				]
			};
		}
	}

	// Chart options
	let options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				title: {
					display: true,
					text: 'Bosses',
					color: '#e7e5e4'
				},
				grid: {
					color: '#a8a29e',
					display: false
				},
				ticks: {
					color: '#e7e5e4',
					display: false
				}
			},
			y: {
				title: {
					display: true,
					text: 'Ratings',
					color: '#e7e5e4'
				},
				grid: {
					color: '#a8a29e'
				},
				ticks: {
					color: '#e7e5e4',
					beginAtZero: true // Ensures that the y-axis starts at 0
				}
			}
		},
		plugins: {
			legend: {
				labels: {
					color: '#e7e5e4'
				}
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						return `${context.dataset.label}: ${context.raw}`;
					}
				}
			}
		}
	};

	function updateChart() {
		const barData = prepareBarData(bosses, mode);

		// Adjust y-axis max based on mode
		if (mode === 'deaths') {
			options.scales.y.max = Math.max(...barData.datasets[0].data) + 1; // Set max slightly above the highest value for deaths
		} else {
			options.scales.y.max = 10; // Reset max to 10 for enjoyment/difficulty mode
		}

		chart.data = barData;
		chart.options = options; // Update options
		chart.update();
	}

	onMount(() => {
		const ctx = document.getElementById('barChart').getContext('2d');

		// Prepare data for the bar chart
		const barData = prepareBarData(bosses, mode);

		// Create the chart instance
		chart = new Chart(ctx, {
			type: 'bar',
			data: barData,
			options: options
		});
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<div class="w-full grow max-w-screen-xl">
	<div class="flex justify-center gap-4 mb-4">
		<button
			class="border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-48"
			style={mode !== 'deaths' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
			on:click={() => {
				mode = 'enjoymentDifficulty';
				updateChart();
			}}
		>
			Enjoyment/Difficulty
		</button>
		<button
			class="border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-48"
			style={mode === 'deaths' ? 'background-color: #F05E1B; border-color: #F05E1B' : ''}
			on:click={() => {
				mode = 'deaths';
				updateChart();
			}}
		>
			Deaths
		</button>
	</div>
	<div class="max-h-[400px] flex justify-center grow w-full">
		<canvas id="barChart" />
	</div>
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
