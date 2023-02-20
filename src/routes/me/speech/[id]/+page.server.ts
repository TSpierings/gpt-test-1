import { speeches } from '$db/speeches';
import type { Speech } from '$lib/speeches/speech';
import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw redirect(303, '/');

	if (!params.id) {
		throw redirect(303, '/me');
	}

	const speech = await speeches.findOne(
		{
			_id: new ObjectId(params.id),
			userEmail: session.user.email
		},
		{ projection: { _id: 0 } }
	);

	if (!speech) {
		throw redirect(303, '/me');
	}

	return {
		speech: { ...(speech as Speech), id: params.id }
	};
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ locals, request }) => {
    const session = await locals.getSession();
		const data = await request.formData();
    const id = data.get('id');
    const speech = data.get('speech');

    if (!id || !speech || !session?.user?.email) {
      throw error(500, "Form data incorrect");
    }

    const speechObject = JSON.parse(speech.toString()) as Speech;
    speechObject.dateModified = new Date();
    speechObject.id = undefined;

    const result = await speeches.findOneAndReplace({
      _id: new ObjectId(id.toString()),
      userEmail: session.user.email
    }, speechObject);

		return {
			status: result.ok === 1 ? 200 : 500
		};
	}
} satisfies Actions;
