<script lang="ts">
	import type { Step } from '$lib/flows';
	import PromptPreview from './prompt-preview.svelte';
	import SpeechStructureTab from './speech-structure-tab.svelte';
	import TabMenu from './tab-menu/tab-menu.svelte';

	export let steps: Array<Step>;
  export let sections = ['Problem', 'Solution', 'Benefit', 'Conclusion'];

	let activeTab = 0;
	const selectTab = (index: number) => {
		activeTab = index;
	};
  
	let tabs = [
		{
			name: 'Speech structure',
			disabled: false
		},
		{
			name: 'Prompt preview',
			disabled: false
		}
	];
</script>

<div>
	<TabMenu {tabs} onSelected={selectTab} selectedTab={activeTab} />
	<section>
		<div class={activeTab !== 0 ? 'hidden' : ''}>
			<SpeechStructureTab bind:sections />
		</div>
		<div class={activeTab !== 1 ? 'hidden' : ''}>
			<PromptPreview {sections} {steps} />
		</div>
	</section>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;
	
	div {
		overflow: hidden;
	}

	@media (min-width: 768px) {
		div {
			grid-column: 2 / span 2;
		}
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
	}
</style>
