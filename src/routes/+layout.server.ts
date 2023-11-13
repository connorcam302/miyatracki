import type { LayoutServerLoad } from './$types';
import { API_KEY, BASE_URL } from '$env/static/private';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	let userData = null;

	if (session !== null && session.user !== null) {
		const response = await fetch(`${BASE_URL}/api/user/uid/${session.user.id}`, {
			headers: { Authorization: `Bearer ${API_KEY}` }
		});

		if (response.ok) {
			userData = await response.json();
		} else {
			console.error('Failed to fetch user data:', response.status, response.statusText);
		}
	}

	console.log('userdata', userData);
	return {
		session,
		userData
	};
};
