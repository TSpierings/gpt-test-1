import { currentSpeech } from './../../../../lib/stores/speech';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';

export const load = (async () => {
	return { status: 200 };
}) satisfies PageLoad;
