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

	const links = [
		'https://images3.alphacoders.com/840/840498.jpg',
		'https://images5.alphacoders.com/779/779589.jpg',
		'https://images3.alphacoders.com/669/669303.png',
		'https://images7.alphacoders.com/695/695728.jpg',
		'https://images2.alphacoders.com/133/1339621.png',
		'https://images5.alphacoders.com/860/860150.jpg',
		'https://images2.alphacoders.com/698/698414.jpg',
		'https://images.alphacoders.com/703/703402.jpg',
		'https://images8.alphacoders.com/100/1003875.jpg',
		'https://images6.alphacoders.com/126/1265754.jpg',
		'https://images3.alphacoders.com/120/1204450.jpg',
		'https://images2.alphacoders.com/663/663017.jpg',
		'https://images2.alphacoders.com/700/700441.jpg',
		'https://images5.alphacoders.com/779/779589.jpg',
		'https://images5.alphacoders.com/121/1217525.png',
		'https://images4.alphacoders.com/133/1331365.jpeg',
		'https://images2.alphacoders.com/130/1304577.png',
		'https://images8.alphacoders.com/130/1309958.png'
	];

	const randomBetween = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	const image = links[randomBetween(0, links.length - 1)];

	console.log(links[randomBetween(0, links.length - 1)]);

	const providers = ['google', 'discord', 'twitch'];
</script>

<div
	class="min-h-screen flex items-center justify-center"
	style="background-image: url({image});
                background-size: cover;
                background-position: center;"
>
	<div class="bg-stone-900 bg-opacity-90 p-6 rounded-2xl">
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
				<button id class="mr-3 text-white text-3xl font-title" on:click={() => goto('/')}
					>miyatracki</button
				>
			</div>
		</div>
	</div>
</div>
