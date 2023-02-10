<script lang="ts">
	import { enhance } from '$app/forms';
	import FlowPanel from '$lib/components/flow-panel.svelte';
	import PreviewPanel from '$lib/components/preview-panel.svelte';
	import ProgressBar from '$lib/components/generic/progress-bar.svelte';
	import type { PageData } from './$types';
	import DraftPanel from '$lib/components/draft-panel.svelte';
	import DraftOptions from '$lib/components/draft-options.svelte';

	export let data: PageData;

	let speechResult = '';
	let draftMode = false;
  let sections = ['Intro', 'Middle', 'Outro'];
  let progress = 0;

	$: {
		if (speechResult) {
			draftMode = true;
      progress = 1;
		}
	}
</script>

<form
	autocomplete="off"
	method="post"
	use:enhance={({ form, data, action, cancel }) => {
		speechResult = 'Generating result...';

		return async ({ result, update }) => {
			console.log(result);
			if (result.type === 'success') {
				speechResult = result.data?.result?.choices[0]?.text;
				console.log(speechResult);
			}
		};
	}}
	action="?/prompt"
>
	<div class="progress-bar">
		<ProgressBar milestones={['Basics', 'Draft', 'Summary']} progress={progress} />
	</div>

	{#if !draftMode}
		<FlowPanel bind:steps={data.flow.steps} />
		<PreviewPanel bind:sections={sections} steps={data.flow.steps} {speechResult} />
	{:else}
    <DraftPanel sections={sections} speechResult={speechResult} />
    <DraftOptions />
	{/if}
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	form {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr min-content;
		margin: 1em 2em;
		gap: 2em;

		@media (min-width: 768px) {
			grid-template-columns: 1fr 1fr 1fr;
		}

		.progress-bar {
			grid-column: 1 / -1;
		}
	}
</style>
