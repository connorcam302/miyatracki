import { db } from '$lib/server/database';
import { userTable } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	console.log('callback hit', {
		code,
		next
	});

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			const { data } = await supabase.auth.getSession();
			const user = data.session.user;
			const userExist = await db.select().from(userTable).where(eq(userTable.uid, user.id));
			if (userExist.length === 0) {
				await db.insert(userTable).values({
					uid: user.id,
					email: user.email,
					displayName: user.email.split('@')[0]
				});
				throw redirect(303, `/profile`);
			} else if (userExist.length > 0) {
				throw redirect(303, `/profile`);
			}
		}
	}

	// return the user to an error page with instructions
	throw redirect(303, '/auth/auth-code-error');
};
