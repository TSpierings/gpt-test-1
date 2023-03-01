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

const sectionMatcher =
  `Paragraph #index is about #description and is named '#title'.
Write this paragraph:`

export const composeSection = (speech: Speech, index: number): string => {
  const topic = speech.topics[index];
  const sauce = compose(speech);
  let sectionPrompt = sectionMatcher;

  sectionPrompt = sectionPrompt.replace('#index', (index + 1).toString());
  sectionPrompt = sectionPrompt.replace('#description', topic.value);
  sectionPrompt = sectionPrompt.replace('#title', topic.title);

  return sauce + '\n' + sectionPrompt;
}
