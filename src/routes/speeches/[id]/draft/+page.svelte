<script lang="ts">
	import type { Speech } from '$lib/speeches/speech';
	import { currentSpeech } from '$lib/stores/speech';
	import { generateSectionContent } from './stream';

	let speech: Speech;

	currentSpeech.subscribe((value: Speech) => (speech = value));

	let disabled = false;

	const generateSection = async (index: number) => {
		disabled = true;
		await generateSectionContent(index);
		disabled = false;
	};

	$: {
		speech.topics.forEach((topic, index) => (topic.cursor < 0 ? generateSection(index) : null));
	}
</script>

Hello: {speech?.title}

{#each speech?.topics as topic, index}
	<h2>{topic.title}</h2>
	<textarea {disabled} rows="6"
		>{topic.content.length > 0 ? topic.content[topic.cursor] : 'Generate a draft'}</textarea
	>
	<button type="button" on:click={() => generateSection(index)}>Generate</button>
{/each}

<style lang="scss">
	@use '/src/lib/colors.scss' as *;
</style>
