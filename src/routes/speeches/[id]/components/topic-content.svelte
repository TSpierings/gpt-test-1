<script lang="ts">
	import TextInputField from '$lib/components/generic/text-input-field.svelte';
	import type { Speech } from '$lib/speeches/speech';

	export let speech: Speech;
</script>

<div class="container">
	<h2>Let's dive in now</h2>
	<p>
		Provide details per topic, all info will be magically incorporated into the draft of your speech. So make every word count!
	</p>

	<div class="scroll-container">
		{#each speech.topics as topic}
			<TextInputField
				bind:value={topic.value}
				label={topic.title}
				name={`topic-${topic}`}
				placeholder="Your story / keywords / braindump here..."
				rows={4}
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 60vh;

		h2 {
			align-self: center;
			font-weight: bolder;
		}

		p {
			margin-bottom: 1rem;
      text-align: center;
		}

		.scroll-container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			overflow-y: auto;
		}
	}
</style>
