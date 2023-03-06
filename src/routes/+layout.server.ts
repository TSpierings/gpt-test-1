import { users } from '$db/users';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.getSession();

	let user = undefined;

	if (session?.user) {
		user = await users.findOne({ email: session?.user?.email ?? '' }, { projection: { _id: 0 } });
	}

	return {
		session: await locals.getSession(),
		user: user
	};
}) satisfies LayoutServerLoad;