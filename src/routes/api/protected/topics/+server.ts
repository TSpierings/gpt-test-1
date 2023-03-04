import { topics } from './../../../../db/topics';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ locals }) => {
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(500, 'No user found');
	}

	const data = await topics
		.find({})
		.toArray();

	const result = JSON.stringify(data);

	return new Response(result);
}) satisfies RequestHandler;
