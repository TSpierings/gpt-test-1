import type { Actions } from './$types';

export const actions = {
  test: async ({ request }) => {
    const data = await request.formData();
    console.log(data);
    return { data: "Some gpt data" };
  },

  prompt: async ({ request }) => {
    const data = await request.formData();

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
      },
      body: JSON.stringify({
        "model": "text-ada-001",
        "prompt": data.get('value'),
        "temperature": 0,
        "max_tokens": 7
      })
    });

    const result = await response.json();

    console.log(result);
    return { status: response.status, result: result };
  }
} satisfies Actions;