import { users } from '$db/users';
import { UserRole } from '$lib/models/user';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals,  }) => {
	const session = await locals.getSession();
	if (!session?.user) throw redirect(303, '/auth/login');

	const user = await users.findOne({ email: session?.user?.email ?? '' }, { projection: { _id: 0 } });
  if (!user?.role || ![UserRole.admin].includes(user.role)) throw redirect(303, '/admin');

	const result = await users.find({}, { projection: { _id: 0 } }).toArray();

	return { users: result };
}) satisfies PageServerLoad;

export const actions = {
	'update': async ({ locals, request }) => {
		const session = await locals.getSession();
		const data = await request.formData();

		const email = data.get('email');
		const role = data.get('role');

		if (!email || !role) throw Error('Incorrect input');

		const user = await users.findOne({ email: session?.user?.email ?? '' }, { projection: { _id: 0 } });
		if (!user?.role || ![UserRole.admin].includes(user.role)) throw redirect(303, '/admin');

		const result = await users.updateOne({
			email: email.toString()
		}, { $set: { role: role as UserRole } });

		return { status: result.modifiedCount };
	}
} satisfies Actions;
