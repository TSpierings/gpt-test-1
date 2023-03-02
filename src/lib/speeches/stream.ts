import { currentSpeech } from '../stores/speech';
import { get } from 'svelte/store';

export const fooParser = async (index: number) => {
  const speech = get(currentSpeech);
  const topic = speech.topics[index];

  topic.content.push('');
  topic.cursor = topic.content.length - 1;

  currentSpeech.set(speech);

  const response = await fetch(`/api/draft`,
    {
      method: 'POST',
      body: JSON.stringify({
        speech: speech,
        index: index
      })
    });

  if (!response.body) throw Error('No response body found');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    topic.content[topic.cursor] = (topic.content[topic.cursor] + chunkValue).trimStart();
    currentSpeech.set(speech);
  }
}

export const generateSectionContent = async (index: number) => {
  const speech = get(currentSpeech);
  const topic = speech.topics[index];

  topic.content.push('');
  topic.cursor = topic.content.length - 1;

  currentSpeech.set(speech);

  const response = await fetch(`/api/draft`,
    {
      method: 'POST',
      body: JSON.stringify({
        speech: speech,
        index: index
      })
    });

  if (!response.body) throw Error('No response body found');

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  let finished = false;

  while (!finished) {
    try {
      if (!reader) break;

      const { value, done } = await reader.read();
      finished = done;

      if (done) break;

      const data = /data: (.+)/.exec(value);

      if (!data || data.length < 2 || data[1] === '[DONE]') break;

      const bar = JSON.parse(data[1]);

      const text = bar.choices[0].text;

      topic.content[topic.cursor] = (topic.content[topic.cursor] + text).trimStart();
      currentSpeech.set(speech);
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return Promise.resolve();
}

import * as eventsourceParser from "eventsource-parser";

export async function OpenAIStream(response: any) {
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
