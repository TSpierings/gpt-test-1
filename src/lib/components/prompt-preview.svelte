<script lang="ts">
	import type { Step } from '$lib/flows';
	import Divider from './generic/divider.svelte';

  export let steps: Array<Step>;
	export let sections: Array<string>;

</script>

<h2>Prompt preview</h2>
<Divider />
<div title="speech-structure">
  {#each steps as step, index}
    <section>
      <h4>{step.title}</h4>
      <p>
        {step.inputs
          .map((input) => (input.value ? `${input.label}: ${input.value}` : undefined))
          .filter((value) => value)
          .join('\n')}
      </p>
    </section>
  {/each}
  <section>
    <h4>Speech structure: </h4>
    <p>{sections.map((section, index) => `Paragraph ${index + 1}: ${section}`).join("\n")}</p>
  </section>
	<button type="submit">Generate draft</button>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	h2 {
		margin: 0;
		padding: 0;
	}

	div {
		display: grid;
		row-gap: 1em;
	}

	section {
		margin: 0;
		padding: 1em;
		background-color: $shade-6;
		border-radius: 0.5em;
		color: $text-dark;

		h4,
		p {
			margin: 0;
			padding: 0;
      white-space: break-spaces;
		}

		h4 {
			font-size: small;
			margin-bottom: 1em;
		}
	}

	button {
		font: inherit;
		background-color: $highlight;
		font-weight: bold;
		margin-bottom: 0.5em;
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
</style>
