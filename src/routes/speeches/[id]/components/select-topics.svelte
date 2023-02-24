<script lang="ts">
	import type { Speech } from '$lib/speeches/speech';

	export let speech: Speech;

	const PremadeTopics = [
		'Why you started the business',
		'What problem do you solve?',
		'Describe your team'
	];

	const onSelectTopic = (topic: string) => {
		if (speech.topics.find((it) => it.title === topic)) {
			speech.topics = speech.topics.filter((it) => it.title !== topic);
		} else {
			speech.topics = [
				...speech.topics,
				{
					title: topic,
					value: '',
					importance: 3
				}
			];
		}
	};
</script>

<div class="container">
	<h2>Select topics</h2>
	<p>
		Provide some more input for your speech, the more topics you select, the better the speech will
		be.
	</p>

	{#each PremadeTopics as topic}
		<button
			type="button"
			class={`topic ${speech?.topics?.find((it) => it.title === topic) ? 'active' : ''}`}
			on:click={() => onSelectTopic(topic)}
		>
			<div class="checkmark"><img src="/checkmark.svg" alt="checkmark" /></div>
			{topic}
		</button>
	{/each}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h2 {
			align-self: center;
			font-weight: bolder;
		}

		p {
			margin-bottom: 1rem;
      text-align: center;
		}

		.topic {
			display: flex;
			align-items: center;
			flex: 1;
			padding: 0.5rem;
			min-height: 1.5rem;
			border: 1px solid $shade-5;
			border-radius: 2px;
			cursor: pointer;
			gap: 1rem;

			&.active {
				border-color: $highlight;

				.checkmark {
					img {
						display: block;
					}
				}
			}

			.checkmark {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 1.5rem;
				height: 1.5rem;
				border: 1px solid $shade-5;
				border-radius: 2px;

				img {
					display: none;
				}
			}
		}
	}
</style>
