<script>
	import IconoirNavArrowRight from 'virtual:icons/iconoir/nav-arrow-right';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: username = '';
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			setUserName();
		}
	};
	$: errorMessage = '';

	$: userId = $page.url.searchParams.get('user');

	const setUserName = async () => {
		if (username.length < 3) {
			errorMessage = 'Username must be at least 3 characters';
		}
		const response = await fetch(`/api/user/update/${userId}?username=${username}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			goto(`/user/${userId}`);
		} else {
			errorMessage = 'Something went wrong';
		}
	};
</script>

<div class="flex flex-col gap-8 text-xl justify-center items-center">
	{#if userId !== null}
		<div class="text-3xl">Set Your Username</div>
		<div
			class="flex text-xl bg-stone-600 bg-opacity-[.30] rounded-full pl-2 items-center max-w-screen-sm"
		>
			<input
				class="bg-transparent pl-2 text-stone-200 grow w-auto"
				bind:value={username}
				on:keypress={handleKeyPress}
			/>
			<button
				class="bg-stone-200 text-stone-700 rounded-full p-2 px-4 hover:bg-stone-400 transition-all text-xl"
				on:click={setUserName}
			>
				<IconoirNavArrowRight />
			</button>
		</div>
		<div class="text-lg text-red-500 h-8">{errorMessage}</div>
	{:else}
		<div>You do not have access to this page.</div>
	{/if}
</div>
