import type { PromptMatcher } from './../../lib/speeches/matchers';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { topics } from '$db/topics';

export const load = (async ({ locals }) => {
	const session = await locals.getSession();

	// If not logged in or no id given, create a new speech
	if (!session?.user?.email) {
		redirect(303, '/');
	}

	const topicResult = await topics
		.find({}, { projection: { _id: 0 } })
		.toArray();

	return {
		topics: topicResult
	};
}) satisfies PageServerLoad;

export const actions = {
	'create-topic': async ({ locals, request }) => {
		await locals.getSession();
		const data = await request.formData();

		const title = data.get('title');
		const matcher = data.get('matcher');

		if (!title) throw Error('No title given');

		const topic: PromptMatcher = {
			title: title.toString(),
			prompt: matcher?.toString() ?? ''
		};

		const result = await topics.updateOne({
			title: topic.title
		}, { $set: topic }, { upsert: true });

		return { status: result.modifiedCount };
	}
} satisfies Actions;
