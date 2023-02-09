import type { Actions } from './$types';

export const actions = {
  test: async ({ request }) => {
    const data = await request.formData();
    console.log(data);
    return { data: "Some gpt data" };
  },

  prompt: async ({ request }) => {
    const data = await request.formData();

    data.forEach(foo => console.log(foo));

    let prompt = Array.from(data.keys())
      .map(key => data.get(key) ? `${key}: ${data.get(key)}` : undefined)
      .filter(val => val !== undefined)
      .join('\n');

    prompt += '\n\nWrite a pitch for the given project above.'

    console.log(prompt);

    // return { status: 200, result: foo };

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
      },
      body: JSON.stringify({
        "model": "text-ada-001",
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
  "type": "success",
  "status": 200,
  "data": {
      "status": 200,
      "result": {
          "id": "cmpl-6gyS3xO8dyYsQx0mfq8kC9kFOVz8E",
          "object": "text_completion",
          "created": 1675700171,
          "model": "text-ada-001",
          "choices": [
              {
                  "text": "Hello investors!\n\nWe are Speechify, a AI app that helps businesses and organizations create speech for their given use cases.\n\nWe are here to help you and your clients get the most out of their conversations, and help them to understand what you are saying.\n\nWe have over two thousand users and our app has been proven to be effective in making sure that clients understand what you are saying.\n\nWe would love to have you on our team, and would be happy to discuss your idea with you and your clients.\n\nThank you for your time,\n\n Speechify",
                  "index": 0,
                  "finish_reason": "stop"
              }
          ],
          "usage": {
              "prompt_tokens": 63,
              "completion_tokens": 125,
              "total_tokens": 188
          }
      }
  }
};