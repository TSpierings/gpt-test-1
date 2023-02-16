import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) throw redirect(303, '/');
	return {};
};

export const actions = {
	test: async ({ request }) => {
		return { result: request.text() };
	}
} satisfies Actions;
