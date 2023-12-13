import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends, url }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session && session.user) {
		const userDataResponse = await fetch(`/api/user/uid/${data.session.user.id}`);
		const userDataJson = await userDataResponse.json();
		const userData: userDataType = userDataJson.data[0];

		return { supabase, session, userData, url: url.pathname };
	} else {
		return { supabase, session, userData: null, url: url.pathname };
	}
};
