import type { RequestHandler } from './$types';

export const POST = (async ( { request } ) => {
  const data = await request.json();

  console.log(data);

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: 'Write a haiku about ' + data.title,
      temperature: 0.7,
      max_tokens: 50,
      stream: true
    })
  });

  return new Response(response.body);
}) satisfies RequestHandler;
