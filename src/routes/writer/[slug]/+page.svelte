<script lang="ts">
	import { enhance } from '$app/forms';
	import Divider from '$lib/components/divider.svelte';
	import InputTab from '$lib/components/input-tab.svelte';
	import ProgressBar from '$lib/components/progress-bar.svelte';
	import TabMenu from '$lib/components/tab-menu.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const steps = data.flow.steps;
	const tabs = steps?.map((step) => step.title);

	tabs.push('Draft');

	let activeRightTab = 0;
	let activeLeftTab = 0;

	const selectRightTab = (index: number) => {
		activeRightTab = index;
	};

	const selectLeftTab = (index: number) => {
		activeLeftTab = index;
	};

	let speechResult = '';
</script>

<div class="container">
	<ProgressBar milestones={['Intro', 'Draft', 'Summary']} />

	<div class="split-panel">
		<div class="left panel">
			<form 
				autocomplete="off"
				method="post"
				use:enhance={({ form, data, action, cancel }) => {
					selectRightTab(1);
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
				<TabMenu {tabs} onSelected={selectLeftTab} selectedTab={activeLeftTab} />
				<section>
					{#each steps as step, index}
						<div class={activeLeftTab !== index ? 'hidden' : undefined}>
							<InputTab title={step.title} bind:dataFields={step.inputs} />
						</div>
					{/each}
					<div class="submit {activeLeftTab !== 2 ? 'hidden' : undefined}">
						<button>Generate a draft</button>
					</div>
				</section>
			</form>
		</div>
		<div class="right panel">
			<TabMenu
				tabs={['Prompt preview', 'Speech result']}
				onSelected={selectRightTab}
				selectedTab={activeRightTab}
			/>
			
			<section>
				{#if activeRightTab === 0}
					<h2>Prompt preview</h2>
					<Divider />
					<h3>The following sections will be sent to GPT as a prompt</h3>
					{#each steps as step}
						<h4>{step.title}</h4>
						<p>
							{step.inputs
								.map((input) => (input.value ? `${input.label}: ${input.value}` : undefined))
								.join('\n')}
						</p>
					{/each}
				{:else}
					<h2>Result</h2>
					<Divider />
					<h4>Draft</h4>
					<p>{speechResult.trim()}</p>
				{/if}
			</section>
		</div>
	</div>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		margin: 1em 2em;

		.split-panel {
			display: flex;
			color: $text-dark;
			flex: 1;
			margin-top: 2em;

			.panel {
				flex: 2;

				&:first-of-type {
					flex: 1;
					margin-right: 2em;
				}

				section {
					display: flex;
					flex-direction: column;
					flex: 1;
					padding: 0.5em 1.5em 1.5em 1.5em;
					background-color: $shade-7;
					color: black;
					border-radius: 0 0 2em 2em;

					.hidden {
						display: none !important;
					}
					
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

					.submit {
						display: flex;
						justify-content: center;
						margin: 1em;

						button {
							cursor: pointer;
						}
					}
				}
			}
		}
	}
</style>
