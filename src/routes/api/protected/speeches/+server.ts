import { speeches } from '$db/speeches';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ locals }) => {
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(500, 'No user found');
	}

	const data = await speeches
		.find({
			userEmail: session?.user?.email
		})
		.toArray();

	const result = JSON.stringify(data);

	return new Response(result);
}) satisfies RequestHandler;
