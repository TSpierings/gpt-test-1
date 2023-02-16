import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { start_mongo } from '$db/mongo';

/**
 * This protects all server requests under the given routes automatically.
 * It doesn't run for client-side routes, only requests made to server pages.
 * If a user shpuldn't see something after logging out, make sure to check the
 * session data on pageload.
 */
async function authorization({ event, resolve }: { event: any; resolve: any }) {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	const result = await resolve(event, {
		transformPageChunk: ({ html }: { html: any }) => html
	});
	return result;
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			GitHub({
				clientId: import.meta.env.VITE_GITHUB_ID,
				clientSecret: import.meta.env.VITE_GITHUB_SECRET
			}) as any,
			Google({
				clientId: import.meta.env.VITE_GOOGLE_ID,
				clientSecret: import.meta.env.VITE_GOOGLE_SECRET
			}) as any
		]
	}),
	authorization
);

start_mongo()
	.then(() => {
		console.log('Mongo started');
	})
	.catch((e: Error) => {
		console.error(e);
	});
