import { composeSection } from '$lib/speeches/composer';
import type { RequestHandler } from './$types';

export const POST = (async ( { request } ) => {
  const { speech, index } = await request.json();

  const prompt = composeSection(speech, index);

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
      max_tokens: 250,
      stream: true
    })
  });

  return new Response(response.body);
}) satisfies RequestHandler;
