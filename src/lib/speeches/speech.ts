import type { ObjectId } from 'mongodb';

export enum SpeechTypes {
	HackathonPitch = 'Hackathon pitch',
	None = 'None'
}

export enum ToneOfVoice {
  CasualAndModest = 'Casual & Modest'
}

export type Topic = {
  title: string;
  value: string;
  importance: number;
}

export type Speech = {
	_id?: ObjectId;
  id?: string;
	userEmail: string;
	dateCreated: Date;
	dateModified: Date;
  
  // inputs
  title: string;
	type: SpeechTypes;
  lengthInSeconds: number;
  toneOfVoice: ToneOfVoice;
  targetAudience: string;

  // parapgrahs
  topics: Array<Topic>;
};
