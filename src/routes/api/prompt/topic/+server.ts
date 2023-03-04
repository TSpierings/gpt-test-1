import { DefaultTopicMatcher } from './../../../../lib/speeches/matchers';
import { topics } from '$db/topics';
import type { Speech } from '$lib/speeches/speech';
import type { RequestHandler } from './$types';

const composeSection = (speech: Speech, index: number, matcher: string): string => {
  const topic = speech.topics[index];

  let sectionPrompt = matcher;

  sectionPrompt = sectionPrompt.replace('#index', (index + 1).toString());
  sectionPrompt = sectionPrompt.replace('#description', topic.value);
  sectionPrompt = sectionPrompt.replace('#title', topic.title);
  sectionPrompt = sectionPrompt.replace('#importance', topic.importance.toString());

  return sectionPrompt;
}

export const POST = (async ({ request }) => {
  const { speech, index }: { speech: Speech, index: number } = await request.json();

  const topic = await topics.findOne({ title: speech.topics[index].title });

  const matcher = topic?.prompt ?? DefaultTopicMatcher.prompt;

  const prompt = composeSection(speech, index, matcher);

  return new Response(prompt);
}) satisfies RequestHandler;
