<script>
	export let userId,
		userName,
		profilePicture,
		gameId,
		gameTitle,
		runId,
		runName,
		runStartDate,
		runEndDate,
		experience,
		bossDeaths;

	import ChildBox from './ChildBox.svelte';
	import { getTimeSinceEpoch, getExperienceTitle } from '$lib/functions';

	let lastBoss = 'No bosses defeated';

	const { unit, count } = getTimeSinceEpoch(runStartDate);
</script>

<ChildBox>
	<div>{runName}</div>
	<div>{gameTitle}</div>
	<div>{getExperienceTitle(experience)}</div>
	<div>{lastBoss}</div>
	<div>{`${count} ${unit}${count !== 1 ? 's' : ''}`} ago</div>
</ChildBox>
