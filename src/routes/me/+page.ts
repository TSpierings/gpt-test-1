import type { Speech } from '$lib/speeches/speech';
import type { PageLoad } from './$types';

type SpeechResult = {
	speeches: Array<Speech>;
};

export const load = (async ({ fetch }): Promise<SpeechResult> => {
	const res = await fetch(`/api/speeches`);
	const speeches = await res.json();

	return { speeches };
}) satisfies PageLoad;
