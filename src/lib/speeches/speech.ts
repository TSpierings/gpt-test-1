import type { ObjectId } from 'mongodb';

export enum SpeechTypes {
	HackathonPitch = 'hackathon-pitch',
	None = 'none'
}

export type Speech = {
	_id?: ObjectId;
	userEmail: string;
	type: SpeechTypes;
	dateCreated: Date;
	dateModified: Date;

	inputs: {
		title: string;
	};
};
