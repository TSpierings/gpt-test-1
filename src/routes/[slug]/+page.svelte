<script lang="ts">
	import { enhance } from '$app/forms';
	import ChatEnhancer from '$lib/components/chat-enhancer.svelte';
	import FlowPanel from '$lib/components/flow-panel.svelte';
	import PreviewPanel from '$lib/components/preview-panel.svelte';
	import ProgressBar from '$lib/components/generic/progress-bar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let speechResult = '';
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
		<ProgressBar milestones={['Basics', 'Draft', 'Summary']} />
	</div>

	<FlowPanel bind:steps={data.flow.steps} />

	<PreviewPanel steps={data.flow.steps} {speechResult} />

	<ChatEnhancer />
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	form {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: min-content 1fr min-content;
		margin: 1em 2em;
		gap: 2em;

		.progress-bar {
			grid-column: 1 / span 3;
		}
	}
</style>
