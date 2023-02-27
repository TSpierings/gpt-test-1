import { currentSpeech } from './../../../../lib/stores/speech';
import { promptResult } from "$lib/stores/speech";
import { get } from 'svelte/store';

export const readInto = async (readableStream: ReadableStream) => {
  const reader = readableStream.pipeThrough(new TextDecoderStream()).getReader();
  promptResult.set('');

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

      const t = bar.choices[0].text;

      promptResult.update(value => value + t);
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return Promise.resolve();
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
      body: JSON.stringify(topic)
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
