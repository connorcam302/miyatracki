<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	let chart;
	let canvas;

	export let bosses = [];

	const foughtBosses = bosses.filter((boss) => boss.deathDate !== null);
	const bossNames = foughtBosses.map((item) => item.name);
	const deaths = foughtBosses.map((item) => item.deaths);
	const averageDeaths = foughtBosses.map((item) => item.avgDeaths);

	// Create cumulative data
	const cumulativeDeaths = deaths.reduce((acc, val) => {
		acc.push((acc.length > 0 ? acc[acc.length - 1] : 0) + val);
		return acc;
	}, []);

	const cumulativeAverageDeaths = averageDeaths.reduce((acc, val) => {
		acc.push((acc.length > 0 ? acc[acc.length - 1] : 0) + val);
		return acc;
	}, []);

	onMount(() => {
		if (canvas) {
			const ctx = canvas.getContext('2d');
			chart = new Chart(ctx, {
				plugins: [
					{
						afterDraw: (chart) => {
							if (chart.tooltip?._active?.length) {
								let x = chart.tooltip._active[0].element.x;
								let yAxis = chart.scales.y;
								let ctx = chart.ctx;
								ctx.save();
								ctx.beginPath();
								ctx.moveTo(x, yAxis.top);
								ctx.lineTo(x, yAxis.bottom);
								ctx.lineWidth = 1;
								ctx.strokeStyle = 'white'; // Grid color
								ctx.stroke();
								ctx.restore();
							}
						},
						id: 'customLine'
					}
				],
				type: 'line',
				data: {
					labels: bossNames,
					datasets: [
						{
							label: 'Total Deaths',
							data: cumulativeDeaths,
							borderColor: 'rgba(255, 159, 64, 1)', // Orange for user data
							backgroundColor: 'rgba(255, 159, 64, 0.2)',
							fill: false
						},
						{
							label: 'Total Average Deaths',
							data: cumulativeAverageDeaths,
							borderColor: 'rgba(54, 162, 235, 1)', // Blue for average data
							backgroundColor: 'rgba(54, 162, 235, 0.2)',
							fill: false
						}
					]
				},
				options: {
					plugins: {
						tooltip: {
							mode: 'index',
							intersect: false
						},
						legend: {
							display: false
						}
					},
					responsive: true,
					scales: {
						x: {
							ticks: {
								display: false // Hide x-axis labels
							},
							grid: {
								color: '#57534e' // Vertical line color
							}
						},
						y: {
							title: {
								display: true,
								text: 'Deaths',
								color: '#a8a29e' // Label text color
							},
							grid: {
								color: '#57534e' // Horizontal line color
							},
							ticks: {
								color: '#a8a29e' // Tick text backgroundColor
							}
						}
					}
				}
			});
		}
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<canvas bind:this={canvas} />
