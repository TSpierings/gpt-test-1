import type { ObjectId } from 'mongodb';

export enum ToneOfVoice {
  CasualAndModest = 'Casual & Modest'
}

export type Topic = {
  // Inputs
  title: string;
  value: string;
  importance: number;

  // Speech paragraph
  content: Array<string>;
  cursor: number;
}

export type Speech = {
  _id?: ObjectId;
  id?: string;
  userEmail: string;
  dateCreated: Date;
  dateModified: Date;

  // inputs
  title: string;
  type: string;
  lengthInSeconds: number;
  toneOfVoice: ToneOfVoice;
  targetAudience: string;

  // parapgrahs
  topics: Array<Topic>;
};
