<script lang="ts">
	import Divider from './generic/divider.svelte';
	import { selectedComponent } from '$lib/stores/enhancer';
	import { jsPDF } from 'jspdf';
	import type { SpeechSection } from '$lib/flows';

	export let speechHistory: Array<SpeechSection>;

	let selection: string;

	selectedComponent.subscribe((value) => {
		selection = value;
	});

	const print = () => {
		const pdf = new jsPDF({
			orientation: 'l',
			unit: 'mm',
			format: 'a6',
			putOnlyUsedFonts: true
		});


    pdf.setFontSize(12);

		const text = speechHistory.map((section, index) => section.history[section.history.length - 1]).join('\n\n');

    pdf.text(text, 10, 10, { maxWidth: 130 });

		pdf.save('pitch.pdf');
	};
</script>

<div class="container">
	<h2>Options</h2>
	<Divider />
	<div class="grid">
    <button formaction="?/summarise">Try again</button>
    <button on:click={print} type="button">Save PDF</button>
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

	h2,
	p {
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
