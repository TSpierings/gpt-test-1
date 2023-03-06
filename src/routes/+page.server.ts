import { users } from '$db/users';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

  let user = undefined;

	if (session?.user) {
		user = await users.findOne({ email: session?.user?.email ?? '' }, { projection: { _id: 0 } });
	}

  return {
    user: user
  };
};
