<script lang="ts">
	import Divider from './generic/divider.svelte';
	import { selectedComponent } from '$lib/stores/enhancer';

	let selection: string;

	selectedComponent.subscribe((value) => {
		selection = value;
	});
</script>

<div class="container">
	<h2>Options</h2>
	<Divider />
	<div class="grid">
    <p>Do something</p>
		{#if selection === ''}
			<h4>Select a section to edit</h4>
		{:else}
      <button formaction='?/summarise'>Try again</button>
		{/if}
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

	h2, p {
		margin: 0;
		padding: 0;
	}

  p {
    margin-bottom: 0.5em;
  }

	.grid {
		display: grid;
		row-gap: 0.5em;

		.hidden {
			display: none !important;
		}
	}
</style>
