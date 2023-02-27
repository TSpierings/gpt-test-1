import type { Speech } from './speech';

const promptMatcher =
  `You're writing a speech.
Speech title: #title
Target audience: #audience
Speech type: #type
Speech length #length seconds
Tone of voice: #tone`;

export const compose = (speech: Speech): string => {
  let prompt = promptMatcher;

  prompt = prompt.replace('#title', speech.title);
  prompt = prompt.replace('#audience', speech.targetAudience);
  prompt = prompt.replace('#type', speech.type);
  prompt = prompt.replace('#length', speech.lengthInSeconds.toString());
  prompt = prompt.replace('#tone', speech.toneOfVoice);

  return prompt;
};
