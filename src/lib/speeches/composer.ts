import { DefaultSpeechMatcher, DefaultTopicMatcher } from './matchers';
import type { Speech } from './speech';

export const compose = (speech: Speech): string => {
  let prompt = DefaultSpeechMatcher.prompt;

  prompt = prompt.replace('#title', speech.title);
  prompt = prompt.replace('#audience', speech.targetAudience);
  prompt = prompt.replace('#type', speech.type);
  prompt = prompt.replace('#length', speech.lengthInSeconds.toString());
  prompt = prompt.replace('#tone', speech.toneOfVoice);

  return prompt;
};

export const composeSection = (speech: Speech, index: number): string => {
  const topic = speech.topics[index];
  const sauce = compose(speech);
  let sectionPrompt = DefaultTopicMatcher.prompt;

  sectionPrompt = sectionPrompt.replace('#index', (index + 1).toString());
  sectionPrompt = sectionPrompt.replace('#description', topic.value);
  sectionPrompt = sectionPrompt.replace('#title', topic.title);

  return sauce + '\n' + sectionPrompt;
}
