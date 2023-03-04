export type PromptMatcher = {
  title: string;
  prompt: string;
}

export const DefaultSpeechMatcher: PromptMatcher = {
  title: 'Hackathon pitch',
  prompt: `You're writing a speech.
Speech title: #title
Target audience: #audience
Speech type: #type
Speech length #length seconds
Tone of voice: #tone`
}

export const DefaultTopicMatcher: PromptMatcher = {
  title: 'What problem are you solving?',
  prompt: `Paragraph #index is about #description and is named '#title'.
  Write this paragraph:`
}
