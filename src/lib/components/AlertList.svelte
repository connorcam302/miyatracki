<!-- AlertList.svelte -->
<script>
	import RatingUpdateAlert from './RatingUpdateAlert.svelte';

	export let alerts = [];

	$: console.log(alerts);

	// Function to remove an alert
	function removeAlert(index) {
		alerts = alerts.filter((_, i) => i !== index);
	}
</script>

<div class="fixed top-4 right-4 w-64">
	{#each alerts as { bossName, ratingType, value }, index (index)}
		<RatingUpdateAlert {bossName} {ratingType} {value} onDismiss={() => removeAlert(index)} />
	{/each}
</div>
