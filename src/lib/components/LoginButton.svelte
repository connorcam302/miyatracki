<script>
	export let provider = 'Not Set';

	const fill = new Map();
	const border = new Map();
	const font = new Map();
	const click = new Map();

	fill.set('google', '#FFFFFF');
	border.set('google', '#747775');
	font.set('google', '#1F1F1F');
	click.set('google', '#EDEDED');

	fill.set('discord', '#5865F2');
	border.set('discord', '#5865F2');
	font.set('discord', '#FFFFFF');
	click.set('discord', '#4f5bdb');

	fill.set('twitch', '#9146FF');
	border.set('twitch', '#9146FF');
	font.set('twitch', '#F0F0FF');
	click.set('twitch', '#7d3cff');

	fill.set('facebook', '#1877F2');
	border.set('facebook', '#1877F2');
	font.set('facebook', '#FFFFFF');
	click.set('facebook', '#0f6ae6');

	fill.set('twitter', '#000000');
	border.set('twitter', '#000000');
	font.set('twitter', '#FFFFFF');
	click.set('twitter', '#000000');
</script>

<button
	class={`border-2 rounded-2xl px-2 w-56 overflow-hidden h-11 flex items-center`}
	style={`border-color: ${border.get(provider)};
            background-color: ${fill.get(provider)}; 
            color: ${font.get(provider)}`}
>
	<div class="flex items-center">
		<img src={`/${provider}-logo.svg`} alt={`${provider} logo`} class="pr-3 w-10" />
		<span class="inline-block font-display">
			Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
		</span>
	</div>
</button>
