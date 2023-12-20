<script lang="ts">
	import { goto } from '$app/navigation';
	import ParentBox from '$lib/components/ParentBox.svelte';

	export let data;
	const { users } = data;
</script>

<div>
	<ParentBox>
		<div class="flex flex-col gap-4">
			<div class="text-3xl text-center">Users</div>
			<div class="flex flex-col gap-4">
				{#each users as user}
					<button
						class="flex mx-4 justify-left items-center gap-4"
						on:click={() => goto(`/user/${user.id}`)}
					>
						<img
							class="rounded-full w-16 h-16"
							src={user.profilePicture}
							alt={user.displayName}
							referrerpolicy="no-referrer"
						/>
						<div class="text-xl font-display">{user.displayName}</div>
					</button>
				{/each}
			</div>
		</div>
	</ParentBox>
</div>
