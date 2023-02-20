import type { Speech } from './speech';

export type HackathonPitch = Speech & {
	inputs: {
		teamName: string;
	};
};
