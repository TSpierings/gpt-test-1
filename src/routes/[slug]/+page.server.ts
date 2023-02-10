import type { Actions } from './$types';

const getInput = (key: string, data: FormData) => {
  return data.get(key) ? `${key}: ${data.get(key)}` : ''
}

export const actions = {
  test: async ({ request }) => {
    const data = await request.formData();
    console.log(data);
    return { data: "Some gpt data" };
  },

  prompt: async ({ request }) => {
    const data = await request.formData();

    data.forEach(foo => console.log(foo));
    Array.from(data.keys()).forEach(key => console.log(key));
    console.log('\n')

    // let prompt = Array.from(data.keys())
    //   .map(key => data.get(key) ? `${key}: ${data.get(key)}` : undefined)
    //   .filter(val => val !== undefined)
    //   .join('\n');

    const sections = parseInt(data.get('section-count')?.toString() ?? '');

    let prompt = 'You are a speechwriter writing energetic, memorable pitches.\n' +
    getInput('Team name', data) + '\n' +
    getInput('Target audience', data) + '\n' +
    getInput('Project description', data) + '\n' +
    getInput('Speech goal', data) + '\n' +
    getInput('Speech length', data) + '\n' +
    `The speech has the following ${data.get('section-count')} paragraphs:\n`;

    for (let i = 0; i < sections; i++) {
      prompt += getInput(`Section ${i}`, data) + '\n';
    }


    prompt += '\nWrite a pitch for the given project:'

    console.log(prompt);

    return { status: 200, result: foo };

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
      },
      body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": prompt,
        "temperature": 0.1,
        "max_tokens": 256
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
      text: 'Intro:\n' +
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
