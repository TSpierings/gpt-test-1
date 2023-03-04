import { speechTypes } from '$db/speech-types';
import { DefaultSpeechMatcher } from '$lib/speeches/matchers';
import type { Speech } from '$lib/speeches/speech';
import type { RequestHandler } from './$types';

const compose = (speech: Speech, matcher: string): string => {
  let prompt = matcher;

  prompt = prompt.replace('#title', speech.title);
  prompt = prompt.replace('#audience', speech.targetAudience);
  prompt = prompt.replace('#type', speech.type);
  prompt = prompt.replace('#length', speech.lengthInSeconds.toString());
  prompt = prompt.replace('#tone', speech.toneOfVoice);

  return prompt;
};

export const POST = (async ({ request }) => {
  const { speech }: { speech: Speech } = await request.json();

  const speechType = await speechTypes.findOne({ title: speech.type });

  const matcher = speechType?.prompt ?? DefaultSpeechMatcher.prompt;

  const prompt = compose(speech, matcher);

  return new Response(prompt);
}) satisfies RequestHandler;
