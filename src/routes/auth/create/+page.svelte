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

<div class="flex flex-col gap-8 text-xl justify-center items-center m-auto h-full">
	{#if userId !== null}
		<div class="text-3xl">Set Your Username</div>
		<div class="">
			<input
				class="bg-stone-900 border-stone-600 border-[1px] flex gap-2 items-center rounded-lg px-2 grow text-xl max-w-screen-sm h-10 w-72 placeholder-stone-600"
				placeholder="Username"
				bind:value={username}
				on:keypress={handleKeyPress}
			/>
		</div>
		<button
			class="text-xl border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-48 py-2"
			on:click={setUserName}
		>
			Create Account
		</button>
		<div class="text-lg text-red-500 h-8">{errorMessage}</div>
	{:else}
		<div>You do not have access to this page.</div>
		<button
			class="text-xl border-stone-600 hover:bg-ember hover:border-ember duration-200 border-[1px] rounded-lg px-1 w-32 py-1"
			on:click={() => goto('/')}>Home</button
		>
	{/if}
</div>
