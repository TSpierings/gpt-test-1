import { speechTypes } from '$db/speech-types';
import { speeches } from '$db/speeches';
import { ToneOfVoice, type Speech } from '$lib/speeches/speech';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { Actions, PageServerLoad } from './$types';
import { topics } from '$db/topics';

export const load = (async ({ locals, params }) => {
	const session = await locals.getSession();

	const topicResult = await topics
		.find({}, { projection: { _id: 0, title: 1 } })
		.toArray();

	const speechTypesResult = await speechTypes
		.find({}, { projection: { _id: 0, title: 1 } })
		.toArray();

	let speech: Speech = {
		title: '',
		dateCreated: new Date(),
		dateModified: new Date(),
		lengthInSeconds: 300,
		targetAudience: '',
		toneOfVoice: ToneOfVoice.CasualAndModest,
		type: speechTypesResult[0].title,
		userEmail: '',
		topics: [],
		paragraphs: []
	} as Speech

	// If logged in and param is valid objectID, get the speech
	if (session?.user?.email && ObjectId.isValid(params.id)) {
		const result = await speeches.findOne(
			{
				_id: new ObjectId(params.id),
				userEmail: session.user.email
			},
			{ projection: { _id: 0 } }
		);

		if (result) {
			speech = { ...(result as Speech), id: params.id };
		}
	}

	return {
		speech: speech,
		topics: topicResult,
		speechTypes: speechTypesResult
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
