import { users } from '$db/users';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	// Return if not logged in yet
	if (!session?.user?.email) return {};

	// Find a user object mathching the logged in users's email address
	const data = await users.findOne(
		{},
		{
			projection: {
				email: session.user.email
			}
		}
	);

	// Create new user object if it doesn't exist
	if (!data) {
		await users.insertOne(session.user);
		console.log(`Inserting new user ${session.user}`);
	} else {
		console.log(`Found user ${data._id}`);
	}

	throw redirect(302, '/');
};
