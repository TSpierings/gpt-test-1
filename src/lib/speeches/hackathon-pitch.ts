import type { Speech } from './speech';

export const HackathonPitchInputs = ['teamName'];

export type HackathonPitch = Speech & {
	inputs: {
		teamName: string;
	};
};
