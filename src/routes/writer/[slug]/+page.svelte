<script lang="ts">
	import { enhance } from '$app/forms';
	import InputTab from '$lib/components/input-tab.svelte';
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

<div class="split-panel">
	<div class="left panel">
		<form method="post" use:enhance={({form, data, action, cancel}) => {
      selectRightTab(1);
      speechResult = 'Generating result...'

      return async ({result, update}) => {
        console.log(result);
        if (result.type === 'success'){
          speechResult = result.data?.result?.choices[0]?.text;
          console.log(speechResult);
        }
      }
    }} action="?/prompt">
			<TabMenu {tabs} onSelected={selectLeftTab} selectedTab={activeLeftTab}/>
			<section>
				{#each steps as step, index}
					<div class={activeLeftTab !== index ? 'hidden' : undefined}>
						<InputTab bind:dataFields={step.inputs} />
					</div>
				{/each}
				<div class="submit {activeLeftTab !== 2 ? 'hidden' : undefined}">
					<button>Generate a draft</button>
				</div>
			</section>
		</form>
	</div>
	<div class="right panel">
		<TabMenu tabs={['Prompt preview', 'Speech result']} onSelected={selectRightTab} selectedTab={activeRightTab}/>
		<section>
			{#if activeRightTab === 0}
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
				<h3>Result</h3>
				<h4>Draft</h4>
				<p>{speechResult.trim()}</p>
			{/if}
		</section>
	</div>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.split-panel {
		display: flex;
		color: $text-dark;
		flex: 1;

		.panel {
			width: 50%;
			flex: 1;

			&.left {
				border-right: 1px solid $shade-2;
			}

			&.right {
				border-left: 1px solid $shade-2;
			}

			section {
				display: flex;
				flex-direction: column;
				flex: 1;
				margin: 0 0.2em;
				padding: 1em;
				background-color: $shade-1;
				color: $text-light;

        .hidden {
          display: none !important;
        }

				h3 {
					margin: 0;
				}

				h4 {
					display: flex;
					width: fit-content;
					margin: 1em 0 0 0;
					padding: 0.2em 0.5em;
					font-size: small;
					background-color: $shade-6;
					color: $text-dark;
					border-radius: 0.2em 0.2em 0 0;
				}

				p {
					margin: 0;
					padding: 1em;
					background-color: $shade-6;
					border-radius: 0 0.2em 0.2em 0.2em;
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
</style>
