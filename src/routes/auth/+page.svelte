<script>
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
	import { env } from '$env/dynamic/public';
	import { goto } from '$app/navigation';

	import LoginButton from '$lib/components/LoginButton.svelte';
	import Flame from '$lib/components/Flame.svelte';

	const handleSignInOauth = async (provider) => {
		let returnData = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${env.PUBLIC_BASE_URL}/auth/callback`
			}
		});
	};

	const providers = ['google', 'discord', 'twitch'];
</script>

<div class="m-auto h-full">
	<div class="bg-stone-900 bg-opacity-100 border-[1px] border-stone-600 p-6 rounded-2xl">
		<div class="text-center">
			<h1 class="text-3xl text-white pb-6">Sign up or Sign in</h1>
			<div class="w-full bg-white bg-opacity-70 h-0.5" />
			<ul class="inline-block py-4">
				{#each providers as provider}
					<li class="flex items-center justify-center m-4">
						<button on:click={() => handleSignInOauth(provider)} class="">
							<LoginButton {provider} />
						</button>
					</li>
				{/each}
			</ul>
			<div class="flex justify-center">
				<div class="pr-2">
					<Flame />
				</div>
				<button class="mr-3 text-white text-3xl font-title" on:click={() => goto('/')}
					>miyatracki</button
				>
			</div>
		</div>
	</div>
</div>
