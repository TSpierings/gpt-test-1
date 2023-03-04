import { currentSpeech } from '../stores/speech';
import { get } from 'svelte/store';

export const generateTopic = async (index: number) => {
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

    console.log(chunkValue);

    topic.content[topic.cursor] = (topic.content[topic.cursor] + chunkValue).trimStart();
    currentSpeech.set(speech);
  }
}
