import type { ObjectId } from 'mongodb';

export enum SpeechTypes {
	HackathonPitch = 'Hackathon pitch',
	None = 'None'
}

export type Speech = {
	_id?: ObjectId;
  id?: string;
	userEmail: string;
	type: SpeechTypes;
	dateCreated: Date;
	dateModified: Date;

	inputs: {
		title: string;
	};
};
