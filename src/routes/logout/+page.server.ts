import { redirect } from '@sveltejs/kit';

export const actions = {
	async default({ locals: { supabase } }) {
		console.log('logging out');
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}
};
