<script>
	export let userId,
		userName,
		profilePicture,
		gameId,
		gameTitle,
		id,
		runName,
		runStartDate,
		runEndDate,
		experience,
		bossDeaths;

	import ChildBox from './ChildBox.svelte';
	import { goto } from '$app/navigation';
	import { getTimeSinceEpoch, getExperienceTitle } from '$lib/functions';

	let lastBoss = 'No bosses defeated';

	const { unit, count } = getTimeSinceEpoch(runStartDate);
</script>

<button on:click={goto('/runs/' + id)}>
	<ChildBox>
		<div>{userName}</div>
		<div>{runName}</div>
		<div>{gameTitle}</div>
		<div>{getExperienceTitle(experience)}</div>
		<div>{lastBoss}</div>
		<div>{`${count} ${unit}${count !== 1 ? 's' : ''}`} ago</div>
	</ChildBox>
</button>
