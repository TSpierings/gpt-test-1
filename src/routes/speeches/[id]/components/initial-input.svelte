<script lang="ts">
	import ProgressContainer from '$lib/components/generic/progress-container.svelte';
	import type { PromptMatcher } from '$lib/speeches/matchers';
	import type { Speech } from '$lib/speeches/speech';
	import { currentSpeech } from '$lib/stores/speech';
	import { generateTopic } from '$lib/speeches/stream';
	import GetStarted from './get-started.svelte';
	import SelectTopics from './select-topics.svelte';
	import TopicContent from './topic-content.svelte';
	import TopicRating from './topic-rating.svelte';

	export let speech: Speech;
	export let topics: PromptMatcher[];
	export let speechTypes: PromptMatcher[];

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

	const onFinish = async () => {
		currentSpeech.set(speech);

		for (let i = 0; i < speech.topics.length; i++) {
			const topic = speech.topics[i];
			topic.content = [];
			await generateTopic(i);
		}
	};
</script>

<ProgressContainer
	items={4}
	bind:selected
	tip={tips[selected]}
	tipLevel={selected === 1 ? 1 : 0}
	finishText={speech.topics.some((topic) => topic.content.length > 0) ? 'Regenerate' : 'Generate'}
	{onFinish}
	{canContinue}
>
	{#if selected === 0}
		<GetStarted bind:speech {speechTypes} />
	{:else if selected === 1}
		<SelectTopics bind:speech {topics} />
	{:else if selected === 2}
		<TopicContent bind:speech />
	{:else if selected === 3}
		<TopicRating bind:speech />
	{/if}
</ProgressContainer>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;
</style>
