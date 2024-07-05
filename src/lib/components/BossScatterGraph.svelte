<script>
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data = []; // Array of games with bosses

	let chart;

	// Function to prepare data for scatter chart
	function prepareScatterData(dataData) {
		let datasets = [];

		function generateColour(number) {
			const hue = (number * 137.508) % 360; // Use golden angle approximation for better color distribution
			const saturation = 80 + (number % 20); // High saturation (80 to 100)
			const lightness = 50 + (number % 10); // Medium to high lightness (50 to 60)

			return hslToHex(hue, saturation, lightness);
		}

		function hslToHex(h, s, l) {
			s /= 100;
			l /= 100;

			let c = (1 - Math.abs(2 * l - 1)) * s;
			let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
			let m = l - c / 2;
			let r = 0,
				g = 0,
				b = 0;

			if (0 <= h && h < 60) {
				r = c;
				g = x;
				b = 0;
			} else if (60 <= h && h < 120) {
				r = x;
				g = c;
				b = 0;
			} else if (120 <= h && h < 180) {
				r = 0;
				g = c;
				b = x;
			} else if (180 <= h && h < 240) {
				r = 0;
				g = x;
				b = c;
			} else if (240 <= h && h < 300) {
				r = x;
				g = 0;
				b = c;
			} else if (300 <= h && h < 360) {
				r = c;
				g = 0;
				b = x;
			}

			r = Math.round((r + m) * 255)
				.toString(16)
				.padStart(2, '0');
			g = Math.round((g + m) * 255)
				.toString(16)
				.padStart(2, '0');
			b = Math.round((b + m) * 255)
				.toString(16)
				.padStart(2, '0');

			return `#${r}${g}${b}`;
		}

		// Iterate through each game
		dataData.forEach((game, i) => {
			// Prepare data for the current game's bosses
			let gameData = {
				label: game.gameName,
				data: game.bosses.map((boss) => ({
					x: parseFloat(boss.avgDifficultyRating),
					y: parseFloat(boss.avgEnjoymentRating),
					label: boss.bossName
				})),
				backgroundColor: data.length > 1 ? generateColour(i) : '#F05E1B',
				pointRadius: 5,
				pointHoverRadius: 10
			};

			datasets.push(gameData);
		});

		return { datasets };
	}

	// Chart options
	let options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			maintainAspectspectRatio: 1,
			x: {
				max: 10,
				title: {
					display: true,
					text: 'Average Difficulty Rating',
					color: '#e7e5e4'
				},
				grid: {
					color: '#a8a29e'
				},
				ticks: {
					color: '#e7e5e4',
					stepSize: 1
				}
			},
			y: {
				max: 10,
				title: {
					display: true,
					text: 'Average Enjoyment Rating',
					color: '#e7e5e4'
				},
				grid: {
					color: '#a8a29e'
				},
				ticks: {
					color: '#e7e5e4',
					stepSize: 1
				}
			}
		},
		plugins: {
			legend: {
				display: data.length > 1 ? true : false,
				labels: {
					color: '#e7e5e4'
				}
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const boss = context.raw;
						return [`${boss.label}`, `Enjoyment: ${boss.y}`, `Difficulty: ${boss.x}`];
					}
				}
			}
		}
	};

	onMount(() => {
		const ctx = document.getElementById('scatterChart').getContext('2d');

		// Prepare data for the scatter chart
		const scatterData = prepareScatterData(data);

		// Create the chart instance
		chart = new Chart(ctx, {
			type: 'scatter',
			data: scatterData,
			options: options
		});
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<canvas id="scatterChart" />

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
