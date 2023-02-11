<script lang="ts">
	import Divider from './generic/divider.svelte';
	import type { SpeechSection } from '$lib/flows';
	import TextareaWrapper from './generic/textarea-wrapper.svelte';

	export let speechHistory: Array<SpeechSection>;
	export let loading: boolean;
</script>

<div class="container">
	<h2>Summarise</h2>
	<Divider />
	<div class="speech-structure">
		{#each speechHistory as section, index (section.title)}
			<section class={`${loading ? 'loading' : ''}`}>
				<span class="head">
					<h4>Section {index + 1}: {section.title}</h4>
					<div>
						<button
							class={section.cursor === 0 ? 'disabled' : 'ok'}
							type="button"
							on:click={() => (section.cursor = Math.max(section.cursor - 1, 0))}>Previous</button
						>
						<button
							class={section.cursor === section.history.length - 1 ? 'disabled' : 'ok'}
							type="button"
							on:click={() =>
								(section.cursor = Math.min(section.cursor + 1, section.history.length - 1))}
							>Next</button
						>
					</div>
				</span>
				{#if loading}
					<span>Generating new text...</span>
				{:else}
					<TextareaWrapper value={section.history} cursor={section.cursor} />
				{/if}
			</section>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.5em;
		background-color: $shade-7;
		color: black;
		border-radius: 2em;
		height: fit-content;
	}

	button {
		font: inherit;
		background-color: $highlight;
		font-weight: bold;
		border: none;
		border-radius: 0.5em;
		color: white;
		text-align: center;
		height: 2em;

		&:hover {
			cursor: pointer;
			background-color: lighten($highlight, 5%);
			color: white;
		}
	}

	@media (min-width: 768px) {
		div {
			grid-column: 1 / span 2;
		}
	}

	.head {
		display: flex;
		justify-content: space-between;
	}

	h2 {
		margin: 0;
		padding: 0;
	}

	.speech-structure {
		display: grid;
		row-gap: 1em;
	}

	section {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 1em;
		background-color: $shade-6;
		border-radius: 0.5em;
		color: $text-dark;
		cursor: pointer;

		&.selected {
			background-color: lighten($highlight, 30%);
		}

		&.loading {
			cursor: unset;
		}

		h4 {
			margin: 0;
			padding: 0;
			white-space: break-spaces;
			font-size: small;
			margin-bottom: 1em;
		}

		button {
			font: inherit;
			font-size: x-small;
			background-color: $highlight;
			font-weight: bold;
			border: none;
			border-radius: 0.5em;
			color: white;
			text-align: center;
			padding: 0.25em 0.5em;
			height: unset;

			&:hover {
				cursor: pointer;
				background-color: lighten($highlight, 5%);
				color: white;
			}

			&.disabled {
				background-color: $shade-5;
				color: $shade-4;
				cursor: unset;
			}
		}
	}

	.continue {
		max-width: 15em;
		justify-self: flex-end;
		padding: 0 1em;
	}
</style>
