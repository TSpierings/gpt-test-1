<script lang="ts">
	import type { PromptMatcher } from '$lib/speeches/matchers';

	export let selectedItem: PromptMatcher;
	export let items: PromptMatcher[];
	export let itemName: string;
</script>

<div class="items">
	{#each items as item}
		<button
			on:click={() => (selectedItem = item)}
			class={`${item.title === selectedItem?.title ? 'selected' : ''}`}>{item.title}</button
		>
	{/each}
	<button class="new" on:click={() => (selectedItem = { title: `new ${itemName}`, prompt: '' })}
		>Create new {itemName}</button
	>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		button {
			display: flex;
			padding: 0.5rem 1rem;
			background-color: $shade-6;
			border-radius: 4px;
			font-family: 'proximanova-bold', 'proximanova-regular', sans-serif;

			&.new {
				background-color: transparent;
				border: 1px dashed black;
			}

			&:hover {
				background-color: $shade-5;
			}

			&.selected {
				background-color: $shade-5;
			}
		}
	}
</style>
