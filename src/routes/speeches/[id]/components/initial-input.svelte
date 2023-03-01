<script lang="ts">
	import ProgressContainer from '$lib/components/generic/progress-container.svelte';
	import type { Speech } from '$lib/speeches/speech';
	import { currentSpeech } from '$lib/stores/speech';
	import { generateSectionContent } from '../../../../lib/speeches/stream';
	import GetStarted from './get-started.svelte';
	import SelectTopics from './select-topics.svelte';
	import TopicContent from './topic-content.svelte';
	import TopicRating from './topic-rating.svelte';

	export let speech: Speech;

	let selected = 0;
	let tips: Array<string> = [];
	let canContinue = true;
	$: {
		tips = [
			'',
			speech?.topics?.length < 3
				? `Pro tip: select ${Math.max(0, 3 - speech?.topics?.length ?? 0)} more topics`
				: '',
			"You're almost there!, we promise...",
			''
		];

		if (selected === 1 && speech?.topics?.length < 1) {
			canContinue = false;
			tips[1] = 'Select at least 1 topic to continue';
		} else {
			canContinue = true;
		}
	}

	const onFinish = () => {
		currentSpeech.set(speech);
		speech.topics.forEach(async (topic, index) =>
			topic.cursor < 0 ? await generateSectionContent(index) : null
		);
	};
</script>

<ProgressContainer
	items={4}
	bind:selected
	tip={tips[selected]}
	tipLevel={selected === 1 ? 1 : 0}
	finishText="Generate"
	{onFinish}
	{canContinue}
>
	{#if selected === 0}
		<GetStarted bind:speech />
	{:else if selected === 1}
		<SelectTopics bind:speech />
	{:else if selected === 2}
		<TopicContent bind:speech />
	{:else if selected === 3}
		<TopicRating bind:speech />
	{/if}
</ProgressContainer>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;
</style>
