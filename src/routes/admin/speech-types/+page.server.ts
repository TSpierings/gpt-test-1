import { speechTypes } from '$db/speech-types';
import type { PromptMatcher } from '$lib/speeches/matchers';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) throw redirect(303, '/auth/login');

	const result = await speechTypes.find({}, { projection: { _id: 0 } }).toArray();

	return { speechTypes: result };
};

export const actions = {
	'create': async ({ locals, request }) => {
		await locals.getSession();
		const data = await request.formData();

		const title = data.get('title');
		const matcher = data.get('matcher');

		if (!title) throw Error('No title given');

		const topic: PromptMatcher = {
			title: title.toString(),
			prompt: matcher?.toString() ?? ''
		};

		const result = await speechTypes.updateOne({
			title: topic.title
		}, { $set: topic }, { upsert: true });

		return { status: result.modifiedCount };
	}, 

	'delete': async ({ locals, request }) => {
		await locals.getSession();
		const data = await request.formData();

		const title = data.get('title');

		if (!title) throw Error('No title given');

		const result = await speechTypes.deleteOne({ title: title});

		return { status: result.deletedCount };
	}
} satisfies Actions;
