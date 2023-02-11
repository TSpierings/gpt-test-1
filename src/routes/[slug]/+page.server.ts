import type { Actions } from './$types';

const getInput = (key: string, data: FormData) => {
	return data.get(key) ? `${key}: ${data.get(key)}` : '';
};

export const actions = {
	prompt: async ({ request }) => {
		const data = await request.formData();

		const sections = parseInt(data.get('section-count')?.toString() ?? '');

    console.log(data);

    console.log(data.get('team-name'));

		let prompt =
			'You are a speechwriter writing energetic, memorable pitches.\n' +
			'Team name: ' + data.get('team-name') +
			'\n' +
			'Target audience: ' + data.get('target-audience') +
			'\n' +
			'Tone of voice: ' + data.get('voice-tone') +
			'\n' +
			'Description: ' + data.get('description') +
			'\n' +
			'What makes us stand out: ' + data.get('standout') +
			'\n' +
			`The speech has the following ${data.get('section-count')} paragraphs:\n`;

		for (let i = 0; i < sections; i++) {
			prompt += data.get(`Section ${i}`) + ':\n';
		}

		prompt += '\nWrite a pitch for the given project, start each paragraph with its name:';

		console.log(prompt);

		// return { status: 200, result: foo };

		const response = await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
			},
			body: JSON.stringify({
				model: 'text-davinci-003',
				prompt: prompt,
				temperature: 0.1,
				max_tokens: 256
			})
		});

		const result = await response.json();
    console.log(result)
		return { status: response.status, result: result };
	},

	regenerate: async ({ request }) => {
		const data = await request.formData();

		let prompt =
			'You are a speechwriter writing energetic, memorable pitches.\n' +
			getInput('Team name', data) +
			'\n' +
			getInput('Target audience', data) +
			'\n' +
			getInput('Project description', data) +
			'\n' +
			getInput('Speech goal', data) +
			'\n' +
			getInput('Speech length', data) +
			'\n\n' +
			'The speech:\n' +
			data.get('speech-result');

		prompt += `\nRephrase paragraph ${data.get('selected-section')}:`;

		console.log(prompt);

		return { status: 200, result: bar };

		const response = await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
			},
			body: JSON.stringify({
				model: 'text-davinci-003',
				prompt: prompt,
				temperature: 0.7,
				max_tokens: 256
			})
		});

		const result = await response.json();
		return { status: response.status, result: result };
	},

	mutate: async ({ request }) => {
		const data = await request.formData();

		let prompt =
			'You are a speechwriter writing energetic, memorable pitches.\n' +
			getInput('Team name', data) +
			'\n' +
			getInput('Target audience', data) +
			'\n' +
			getInput('Project description', data) +
			'\n' +
			getInput('Speech goal', data) +
			'\n' +
			getInput('Speech length', data) +
			'\n\n' +
			'The speech:\n' +
			data.get('speech-result');

		const mutationPrompt = data.get('mutation-prompt')?.toString() ?? '';
    const sectionName = data.get('selected-section');

		switch (data.get('mutation-type')) {
			case 'add-question':
				prompt += `\nAdd a question to paragraph ${sectionName} to make it more interactive`;
				break;
			case 'personal-story':
				prompt += `\nAdd a personal experience that relates to the challenge to paragraph ${sectionName}`;
				break;
			case 'catchy-summary':
				prompt += `\nAdd a one sentence analogy to paragraph ${sectionName} that explains what the product does using the following construction: we want to be the {company} of {subject} because of {reason}.`;
				break;
			case 'highlight-problem':
				prompt += `\nHighlight the problem more clearly in paragraph ${sectionName}`;
				break;
			case 'add-quote':
				prompt += `\nInsert a famous quote in paragraph ${sectionName}, only use quotes of which you know the author`;
				break;
			case 'reference-circumstance':
				prompt += `\nIncorporate an observation in paragraph ${sectionName} about my context into the problem`;
				break;
			default:
				return { status: 200, result: bar };
		}

		if (mutationPrompt !== '') {
			prompt += ', ' + mutationPrompt;
		}

		prompt += '\nWrite the whole paragraph with the new addition:\n';

		console.log(prompt);

		// return { status: 200, result: bar };

		const response = await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
			},
			body: JSON.stringify({
				model: 'text-davinci-003',
				prompt: prompt,
				temperature: 0.7,
				max_tokens: 256
			})
		});

		const result = await response.json();
    console.log(result);
		return { status: response.status, result: result };
	},

  summarise: async ({ request }) => {
		const data = await request.formData();

		const prompt = 'This is a speech:\n' + data.get('speech-result') + '\n Summarise it in bullet points for each paragraph and delimit paragraphs with ###:\n';

		console.log(prompt);

		// return { status: 200, result: snafu };

		const response = await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
			},
			body: JSON.stringify({
				model: 'text-davinci-003',
				prompt: prompt,
				temperature: 0.7,
				max_tokens: 256
			})
		});

		const result = await response.json();

    console.log(result);

		return { status: response.status, result: result };
	}
} satisfies Actions;

const foo = {
	id: 'cmpl-6iTxtgKtDNT01lnbWHMgYfdNDqFR0',
	object: 'text_completion',
	created: 1676059637,
	model: 'text-davinci-003',
	choices: [
		{
			text:
				'Intro:\n' +
				"Good evening, investors and hackathon attendees! I'm here to introduce you to Speeching.ai, an AI app that helps you create the perfect speech for any use case. Whether you're giving a presentation at work, a speech at a wedding, or a pitch at a hackathon, Speeching.ai has you covered. \n" +
				'\n' +
				'Middle:\n' +
				'Speeching.ai is the perfect tool for anyone looking to make a lasting impression. Our AI-powered app helps you craft a speech that is both memorable and energetic. It takes the guesswork out of writing a speech, so you can focus on delivering it with confidence. Plus, Speeching.ai is easy to use and can be tailored to any use case. \n' +
				'\n' +
				'Outro:\n' +
				"So, if you're looking for a way to make your speech stand out from the crowd, look no further than Speeching.ai. With our AI-powered app, you can create a speech that is sure to leave a lasting impression. Thank you for your time and I look forward to hearing your thoughts.",
			index: 0,
			logprobs: null,
			finish_reason: 'stop'
		}
	],
	usage: { prompt_tokens: 116, completion_tokens: 225, total_tokens: 341 }
};

const bar = {
	id: 'cmpl-6iTxtgKtDNT01lnbWHMgYfdNDqFR0',
	object: 'text_completion',
	created: 1676059637,
	model: 'text-davinci-003',
	choices: [
		{
			text: `\nGood evening, investors and hackathon attendees! I'm here to present to you Speeching.ai, a revolutionary AI app that makes it easy to craft a memorable and energetic speech. No matter what the use case, Speeching.ai takes the guesswork out of writing a speech, so you can focus on making a lasting impression.`,
			index: 0,
			logprobs: null,
			finish_reason: 'stop'
		}
	],
	usage: { prompt_tokens: 116, completion_tokens: 225, total_tokens: 341 }
};

const snafu = {
  id: 'cmpl-6ijBwvxVVRSDzELyUcw8dLNlbGBlv',
  object: 'text_completion',
  created: 1676118168,
  model: 'text-davinci-003',
  choices: [
    {
      text: '\n' +
        'Intro:\n' +
        '- Introducing Speeching.ai, an AI app to create the perfect speech no matter the use case.\n' +
        '- Suitable for presentations at work, speeches at weddings and pitches at hackathons.\n' +
        '###\n' +
        'Middle:\n' +
        '- Speeching.ai helps you craft a memorable and energetic speech. \n' +
        '- Takes the guesswork out of writing a speech.\n' +
        '- Easy to use and can be tailored to any use case.\n' +
        '###\n' +
        'Outro:\n' +
        '- Speeching.ai helps create a speech that stands out from the crowd.\n' +
        '- Leave a lasting impression.\n' +
        '- Thank you for your time and looking forward to hearing your thoughts.',
      index: 0,
      logprobs: null,
      finish_reason: 'stop'
    }
  ],
  usage: { prompt_tokens: 244, completion_tokens: 136, total_tokens: 380 }
};
