<script lang="ts">
	import Divider from './generic/divider.svelte';
	import { selectedComponent } from '$lib/stores/enhancer';

	let selection: string;

	selectedComponent.subscribe((value) => {
		selection = value;
	});
</script>

<div class="container">
	<h2>Personalisation</h2>
	<Divider />
	<div class="grid">
		{#if selection === ''}
			<h4>Select a section to edit</h4>
		{:else}
			<h4>Editing {selection}</h4>
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

	h2 {
		margin: 0;
		padding: 0;
	}

	.grid {
		display: grid;
		row-gap: 1em;
	}
</style>
