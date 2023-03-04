import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) throw redirect(303, '/auth/login');
	return {};
};

export const actions = {
	create: async ({ locals }) => {
		const session = await locals.getSession();

		if (!session?.user?.email) {
			throw error(500, 'No user email found');
		}

		// const document: Speech = {
		// 	userEmail: session.user.email,
		// 	type: SpeechTypes.None,
		// 	dateCreated: new Date(),
		// 	dateModified: new Date(),
    //   title: 'New speech'
		// };

		// const newSpeech = await speeches.insertOne(document);

		// if (!newSpeech.acknowledged) {
		// 	throw error(500, 'Problem inserting into DB');
		// }

		// return { result: newSpeech.insertedId };
    return { result: null };
	}
} satisfies Actions;
