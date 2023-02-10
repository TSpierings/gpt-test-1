<script lang="ts">
	import Divider from './generic/divider.svelte';
	import { selectedComponent } from '$lib/stores/enhancer';

	export let speechResult: string;
	export let sections: Array<string>;

	let sectionContent: Array<string>;
	let selection: string;

	selectedComponent.subscribe((value) => {
		selection = value;
	});

	const selectComponent = (component: string) => {
		selectedComponent.set(component);
	};

	$: {
		if (speechResult) {
			sectionContent = sections.map(
				(section) => RegExp(`${section}:\n(.+)`, 'g').exec(speechResult)?.at(1) ?? ''
			);
		}
		console.log(sectionContent);
	}
</script>

<div class="container">
	<h2>Draft</h2>
	<Divider />
	<div class="speech-structure">
		{#each sections as section, index}
			<section
				on:click={() => selectComponent(section)}
				on:keyup={undefined}
				class={`${selection === section ? 'selected' : ''}`}
			>
				<h4>Section {index + 1}: {section}</h4>
				<p>{sectionContent?.at(index)}</p>
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
  
	@media (min-width: 768px) {
		div {
			grid-column: 1 / span 2;
		}
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
		margin: 0;
		padding: 1em;
		background-color: $shade-6;
		border-radius: 0.5em;
		color: $text-dark;
		cursor: pointer;

		&.selected {
			background-color: lighten($highlight, 30%);
		}

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
</style>
