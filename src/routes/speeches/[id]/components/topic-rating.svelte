<script lang="ts">
	import type { Speech, Topic } from '$lib/speeches/speech';

	export let speech: Speech;

	const selectStar = (topic: Topic, index: number) => {
		topic.importance = index + 1;
		speech = speech;
	};
</script>

<div class="container">
	<h2>Rate your selected topics</h2>
	<p>
		What topics do you want to emphasize? This helps us in setting up a good first draft of your
		speech.
	</p>

	{#each speech.topics as topic}
		<div class="topic">
			{#each Array(5) as _, index (index)}
				<button
					class={`star ${topic.importance > index ? 'active' : ''}`}
					type="button"
					on:click={() => selectStar(topic, index)}
					><img src="/star.svg" alt="star" />
				</button>
			{/each}
			<span>{topic.title}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 70vh;

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
			gap: 4px;

			span {
				margin-left: 0.5rem;
			}

			.star {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 1.5rem;
				height: 1.5rem;
				border: 1px solid $shade-5;
				border-radius: 2px;
			  cursor: pointer;

				img {
					filter: grayscale(1);
				}

				&.active {
					border-color: $shade-4;

					img {
						filter: unset;
					}
				}
			}
		}
	}
</style>
