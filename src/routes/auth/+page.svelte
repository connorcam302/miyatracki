<script>
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	import LoginButton from '$lib/components/LoginButton.svelte';

	const handleSignInOauth = async (provider) => {
		let returnData = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `http://localhost:5173/auth/callback`
			}
		});
		console.log(returnData);
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};

	const providers = ['google', 'discord', 'twitch'];
</script>

<div class="flex flex-col items-center gap-3">
	{#each providers as provider}
		<button on:click={() => handleSignInOauth(provider)}><LoginButton {provider} /></button>
	{/each}
</div>
