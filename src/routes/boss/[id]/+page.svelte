<script>
	import { getContext } from 'svelte';

	export let data;

	$: viewport = getContext('viewport');

	$: console.log($viewport);

	const { boss, supabase } = data;
</script>
