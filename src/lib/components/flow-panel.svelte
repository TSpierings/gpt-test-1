<script lang="ts">
	import type { Step } from '$lib/flows';
	import Divider from './generic/divider.svelte';
	import TabMenu from './tab-menu/tab-menu.svelte';
	import TextInputField from './generic/text-input-field.svelte';

	export let steps: Array<Step>;
	const tabs = steps?.map((step) => {
		return { name: step.title, disabled: false };
	});

	let activeTab = 0;
	const selectTab = (index: number) => {
		if (index < tabs.length) {
			activeTab = index;
		} else if (index - 2 >= 0) {
			activeTab = index - 2;
		}
	};
</script>

<div>
	<TabMenu {tabs} onSelected={selectTab} selectedTab={activeTab} />
	<section>
		{#each steps as step, index}
			<div class={activeTab !== index ? 'hidden' : undefined}>
				<h2>{step.title}</h2>
				<Divider />
				<div class="input-fields">
					{#each step.inputs as field}
						<TextInputField label={field.label} bind:value={field.value} rows={field.rows} />
					{/each}
				</div>
			</div>
		{/each}

		<button
			type="button"
			on:click={() => {
				selectTab(activeTab + 1);
			}}>{activeTab < tabs.length - 1 ? 'Next step' : 'Previous step'}</button
		>
	</section>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;
	
	div {
		grid-row: 2;
	}

	section {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0.5em 1.5em 1.5em 1.5em;
		background-color: $shade-7;
		color: black;
		border-radius: 0 0 2em 2em;

		div {
			display: flex;
			flex-direction: column;

			&.hidden {
				display: none !important;
			}

			.input-fields {
				display: grid;
				row-gap: 1em;
			}
		}

		h2 {
			margin: 0;
			padding: 0;
		}

		button {
			font: inherit;
			margin-top: 1em;
			padding: 0.5em 1.5em;
			background-color: $highlight;
			font-weight: bold;
			margin-bottom: 0.5em;
			border: none;
			border-radius: 0.5em;
			color: white;
			text-align: center;

			&:hover {
				cursor: pointer;
				background-color: lighten($highlight, 5%);
				color: white;
			}
		}
	}
</style>
