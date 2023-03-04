import type { Speech } from '$lib/speeches/speech';
import * as eventsourceParser from "eventsource-parser";
import type { RequestHandler } from './$types';

export const config = {
  runtime: "edge",
};

const getSpeechTypePrompt = async (speech: Speech, origin: string) => {
  const response = await fetch(origin + `/api/prompt/speech-type`,
  {
    method: 'POST',
    body: JSON.stringify({
      speech: speech,
    })
  });

  return await response.text();
}

const getTopicPrompt = async (speech: Speech, index: number, origin: string) => {
  const response = await fetch(origin + `/api/prompt/topic`,
  {
    method: 'POST',
    body: JSON.stringify({
      speech: speech,
      index: index,
    })
  });

  return await response.text();
}

export const POST = (async ( { request, url } ) => {
  const { speech, index } = await request.json();

  const speechPrompt = await getSpeechTypePrompt(speech, url.origin);
  const topicPrompt = await getTopicPrompt(speech, index, url.origin);

  console.log(speechPrompt + '\n' + topicPrompt);

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET_KEY}`
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: speechPrompt + '\n' + topicPrompt,
      temperature: 0.7,
      max_tokens: 250,
      stream: true
    })
  });

  const stream = await OpenAIStream(response);
  return new Response(stream);
}) satisfies RequestHandler;

async function OpenAIStream(response: Response) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: eventsourceParser.ParsedEvent | eventsourceParser.ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].text;
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = eventsourceParser.createParser(onParse);
      for await (const chunk of response.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
