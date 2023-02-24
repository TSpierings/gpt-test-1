import type { Speech } from '$lib/speeches/speech';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const res = await fetch(`/api/speeches`);
	const speeches = await res.json();

	return { speeches: speeches as Speech[] };
}) satisfies PageLoad;
