<script lang="ts">
	import type { Speech } from '$lib/speeches/speech';
	import moment from 'moment';
	import Section from './section.svelte';

	export let speech: Speech;
	let time = '';

	$: {
		getDuration(speech);
	}

	const getDuration = (speech: Speech) => {
		const wordCount = speech.topics
			.map((topic) => {
				return `${topic.title}:\n${topic.content[topic.cursor]}`;
			})
			.join('\n')
			.split(' ').length;

		const duration = moment.duration(wordCount / 2.5, 'seconds');
		time = `${duration.minutes()} mins. ${duration.seconds()} sec.`;
	};
</script>

<div class="container">
	<div class="sections">
		{#each speech.topics as topic}
			<Section bind:topic />
		{/each}
	</div>

	<div class="menu">
		<span>Total speeching time: {time}</span>
		<button class="button">Save</button>
	</div>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: white;
		overflow-y: auto;
		padding: 1.5rem 3rem 0.5rem 3rem;

		@media (max-width: 768px) {
			padding: 1.5rem 1rem 0.5rem 1rem;
			overflow-y: visible;
		}

		.sections {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			gap: 3rem;
		}

		.menu {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 3rem;

			span {
				color: $shade-4;
				font-family: 'proximanova-bold', 'proximanova-regular', sans-serif;
			}
		}
	}
</style>
