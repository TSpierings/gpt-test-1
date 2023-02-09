<script lang="ts">
	import type { Step } from '$lib/flows';
	import Divider from './generic/divider.svelte';
	import PromptPreview from './prompt-preview.svelte';
	import SpeechStructureTab from './speech-structure-tab.svelte';
	import TabMenu from './tab-menu/tab-menu.svelte';

	export let speechResult = '';
	export let steps: Array<Step>;

	let activeTab = 0;
	const selectTab = (index: number) => {
		activeTab = index;
	};

	let sections = ['Intro', 'Middle', 'Outro'];
	let tabs = [
		{
			name: 'Speech structure',
			disabled: false
		},
		{
			name: 'Prompt preview',
			disabled: false
		},
		{
			name: 'Draft',
			disabled: speechResult === ''
		}
	];

	$: {
		if (speechResult !== '') {
			tabs[2].disabled = false;
			activeTab = 2;
		}
	}
</script>

<div title="preview-panel">
	<TabMenu {tabs} onSelected={selectTab} selectedTab={activeTab} />
	<section>
		<div class={activeTab !== 0 ? 'hidden' : ''}>
			<SpeechStructureTab bind:sections />
		</div>
		<div class={activeTab !== 1 ? 'hidden' : ''}>
			<PromptPreview {sections} {steps} />
		</div>
		<div class={activeTab !== 2 ? 'hidden' : ''}>
			<h2>Result</h2>
			<Divider />
			<section>
				<h4>Draft</h4>
				<p>{speechResult}</p>
			</section>
		</div>
	</section>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	div {
		grid-column: span 2;
	}

	.hidden {
		display: none !important;
	}

	section {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0.5em 1.5em 1.5em 1.5em;
		background-color: $shade-7;
		color: black;
		border-radius: 0 0 2em 2em;

		h2 {
			margin: 0;
			padding: 0;
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
	}
</style>
