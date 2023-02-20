import { speeches } from '$db/speeches';
import { SpeechTypes, type Speech } from '$lib/speeches/speech';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) throw redirect(303, '/');
	return {};
};

export const actions = {
	create: async ({ request, locals }) => {
		// const data = await request.formData();
		const session = await locals.getSession();

		if (!session?.user?.email) {
			throw error(500, 'No user email found');
		}

		const document: Speech = {
			userEmail: session.user.email,
			type: SpeechTypes.None,
			dateCreated: new Date(),
			dateModified: new Date(),
			inputs: {
				title: 'New speech'
			}
		};

		const newSpeech = await speeches.insertOne(document);

		if (!newSpeech.acknowledged) {
			throw error(500, 'Problem inserting into DB');
		}

		console.log(`Created ${newSpeech.insertedId}`);
		return { result: 'yes' };
	}
} satisfies Actions;
