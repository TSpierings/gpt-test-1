import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await event.locals.getSession();
  return {};
};
