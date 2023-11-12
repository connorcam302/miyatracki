<script>
	import { signIn } from '$lib/supabase';
	export let provider = 'Not Set';

	const fill = new Map();
	const border = new Map();
	const font = new Map();

	fill.set('google', '#FFFFFF');
	border.set('google', '#747775');
	font.set('google', '#1F1F1F');
</script>

<button
	class={`bg-${fill[provider]} border-${border[provider]} text-${font[provider]} border-2 rounded-xl p-2`}
	on:click={() => signIn(provider)}
>
	<div class="flex m-auto items-center h-10">
		<img src={`/${provider}-logo.svg`} alt={`${provider} logo`} class="pr-3" />
		<span class="inline-block">
			Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
		</span>
	</div>
</button>
