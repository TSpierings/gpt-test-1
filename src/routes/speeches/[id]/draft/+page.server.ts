import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// export const load = (async ( { fetch }) => {
// 	// const response = await fetch('/api/draft');

//   return {
//     result: ''
//   };
// }) satisfies PageServerLoad;

export const actions = {
	'generate-section': async ({ request }) => {
		const data = await request.formData();
		const title = data.get('topic-title')?.toString();
		const index = data.get('section-index')?.toString();

		console.log(title);

		// const response = await fetch('https://api.openai.com/v1/completions', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
		// 	},
		// 	body: JSON.stringify({
		// 		model: 'text-davinci-003',
		// 		prompt: 'Write a haiku about ' + title,
		// 		temperature: 0.7,
		// 		max_tokens: 50,
		// 		stream: true
		// 	})
		// });

		// if (!response.body) throw Error('No response body');

		// generateSectionContent(parseInt(index ?? '0'), response.body);
	
		return 'success?';
	}
} satisfies Actions
