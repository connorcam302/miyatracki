<script>
	import ParentBox from '$lib/components/ParentBox.svelte';

	export let data;

	const { user, runs, ratings } = data;
	const { displayName, profilePicture } = user;

	console.log('user', user);
	console.log('runs', runs);
	console.log('ratings', ratings);
</script>

<div class="flex flex-wrap w-full">
	<div class="flex flex-col">
		<ParentBox>
			<div class="flex flex-col mx-4 justify-center items-center gap-4">
				<img
					class="rounded-full w-64 h-64"
					src={profilePicture}
					alt={displayName}
					referrerpolicy="no-referrer"
				/>
				<div class="text-3xl font-display">{displayName}</div>
			</div>
		</ParentBox>
		<ParentBox>
			<div class="flex flex-col mx-4 justify-center items-center gap-4">
				<img
					class="rounded-full w-64 h-64"
					src={profilePicture}
					alt={displayName}
					referrerpolicy="no-referrer"
				/>
				<div class="text-3xl font-display">{displayName}</div>
			</div>
		</ParentBox>
	</div>
</div>
