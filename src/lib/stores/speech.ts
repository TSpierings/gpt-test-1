import type { Speech } from './../speeches/speech';
import { writable } from 'svelte/store';

export const currentSpeech = writable<Speech>();
export const promptResult = writable<string>();
