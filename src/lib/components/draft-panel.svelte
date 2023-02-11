<script lang="ts">
	import Divider from './generic/divider.svelte';
	import { selectedComponent } from '$lib/stores/enhancer';
	import type { SpeechSection } from '$lib/flows';
	import TextareaWrapper from './generic/textarea-wrapper.svelte';
  import moment from 'moment';

	export let speechResult: string;
	export let speechHistory: Array<SpeechSection>;
	export let sections: Array<string>;
	export let loading: boolean;

	let selection: string;

  const foo = moment.duration(100, 'seconds').humanize();

	selectedComponent.subscribe((value) => {
		selection = value;
	});

	const selectComponent = (component: string) => {
		if (!loading) {
			selectedComponent.set(component);
		}
	};

  const getDuration = (text: Array<SpeechSection>) => {
    const wordCount = text
			.map((section) => {
				return `${section.title}:\n${section.history[section.cursor]}`;
			})
			.join('\n').split(" ").length;

      return moment.duration(wordCount / 2.5, 'seconds').humanize()
  }

	$: {
		// if (speechResult) {
		// 	sectionContent = sections.map(
		// 		(section) => RegExp(`${section}:\n(.+)`, 'g').exec(speechResult)?.at(1) ?? ''
		// 	);
		// }
    speechHistory = [...speechHistory];
	}
</script>

<div class="container">
  <span class="head">
	  <h2>Draft</h2>
    <span>{getDuration(speechHistory)}</span>
  </span>
	<Divider />
	<div class="speech-structure">
		{#each speechHistory as section, index (section.title)}
			<section
				on:click={() => selectComponent(section.title)}
				on:keyup={undefined}
				class={`${selection === section.title ? 'selected' : ''} ${loading ? 'loading' : ''}`}
			>
				<span class="head">
					<h4>Section {index + 1}: {section.title}</h4>
					<div>
						<button
              class={section.cursor === 0 ? 'disabled' : 'ok' }
							type="button"
							on:click={() => (section.cursor = Math.max(section.cursor - 1, 0))}>Previous</button>
						<button
              class={section.cursor === section.history.length - 1 ? 'disabled' : 'ok' }
							type="button"
							on:click={() =>
								(section.cursor = Math.min(section.cursor + 1, section.history.length - 1))}
							>Next</button>
					</div>
				</span>
				{#if loading && selection === section.title}
					<span>Generating new text...</span>
				{:else}
          <TextareaWrapper bind:value={section.history} cursor={section.cursor} />
				{/if}
			</section>
		{/each}
		<input hidden name="selected-section" value={selection} />
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
		font-size: x-small;
		background-color: $highlight;
		font-weight: bold;
		border: none;
		border-radius: 0.5em;
		color: white;
		text-align: center;
		padding: 0.25em 0.5em;

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
	}
</style>
