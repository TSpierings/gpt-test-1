import { speeches } from '$db/speeches';
import { compose } from '$lib/speeches/composer';
import { SpeechTypes, ToneOfVoice, type Speech } from '$lib/speeches/speech';
import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const session = await locals.getSession();

	// If not logged in or no id given, create a new speech
	if (!session?.user?.email || !ObjectId.isValid(params.id)) {
		return {
			speech: {
				title: '',
				dateCreated: new Date(),
				dateModified: new Date(),
				lengthInSeconds: 300,
				targetAudience: '',
				toneOfVoice: ToneOfVoice.CasualAndModest,
				type: SpeechTypes.HackathonPitch,
				userEmail: '',
				topics: [],
				paragraphs: []
			} as Speech
		};
	}

	const speech = await speeches.findOne(
		{
			_id: new ObjectId(params.id),
			userEmail: session.user.email
		},
		{ projection: { _id: 0 } }
	);

	// If no speech found for the given ID, create a new speech
	if (!speech) {
		return {
			speech: {} as Speech
		};
	}

	// Else, return the found speech for editing
	return {
		speech: { ...(speech as Speech), id: params.id }
	};
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ locals, request }) => {
		const session = await locals.getSession();
		const data = await request.formData();
		const speech = data.get('json-speech')?.toString();

		if (!speech || !session?.user?.email) {
			throw error(500, 'Form data incorrect');
		}

		const speechObject = JSON.parse(speech.toString()) as Speech;
		speechObject.dateModified = new Date();

		let result;

		// Update existing
		if (speechObject.id) {
			result = await speeches.findOneAndReplace(
				{
					_id: new ObjectId(speechObject.id.toString()),
					userEmail: session.user.email
				},
				speechObject
			);

			return {
				status: result.ok === 1 ? 200 : 500
			};
		}

		// Add new
		speechObject.userEmail = session.user.email;

		result = await speeches.insertOne(
			speechObject
		);

		if (!result.acknowledged) {
			throw error(500, 'Problem inserting into DB');
		}

		return { id: result.insertedId.toString() };
	}
} satisfies Actions;
