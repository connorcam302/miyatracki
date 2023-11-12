<script>
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email;
	let password;

	console.log(supabase.auth.getSession());

	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});
	};

	const handleSignIn = async () => {
		let data = await supabase.auth.signInWithPassword({
			email,
			password
		});
		console.log(data);
	};

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
</script>

<form on:submit={handleSignUp}>
	<input name="email" bind:value={email} />
	<input type="password" name="password" bind:value={password} />
	<button>Sign up</button>
</form>

<button on:click={() => handleSignInOauth('google')}> Sign in with Google </button>
<button on:click={handleSignIn}>Sign in</button>
<button on:click={handleSignOut}>Sign out</button>
