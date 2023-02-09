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
  let tabs = [{
    name: 'Speech structure',
    disabled: false
  },{
    name: 'Prompt preview',
    disabled: false
  },{
    name: 'Draft',
    disabled: true
  },]
</script>

<div title="preview-panel">
	<TabMenu
		tabs={tabs}
		onSelected={selectTab}
		selectedTab={activeTab}
	/>
	<section>
		{#if activeTab === 0}
			<SpeechStructureTab bind:sections />
		{:else if activeTab === 1}
			<PromptPreview {sections} {steps} />
		{:else if activeTab === 2}
			<h2>Result</h2>
			<Divider />
			<h4>Draft</h4>
			<p>{speechResult.trim()}</p>
		{/if}
	</section>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	div {
		grid-column: span 2;
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

		h4 {
			display: flex;
			width: fit-content;
			margin: 1em 0 0 0;
			padding: 0.2em 0.5em;
			font-size: small;
			background-color: $shade-6;
			color: $text-dark;
			border-radius: 0.5em 0.5em 0 0;
		}

		p {
			margin: 0;
			padding: 1em;
			background-color: $shade-6;
			border-radius: 0 0.5em 0.5em 0.5em;
			color: $text-dark;
			font-weight: bold;
			white-space: pre-line;
		}
	}
</style>
