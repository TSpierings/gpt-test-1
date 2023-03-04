<script lang="ts">
	import Panel from '$lib/components/generic/panel.svelte';
	import type { PromptMatcher } from '$lib/speeches/matchers';
	import ItemList from '../components/item-list.svelte';
	import MatcherEditor from '../components/matcher-editor.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { topics } = data;

	let selectedItem: PromptMatcher;
</script>

<div class="container">
	<Panel title="Topics">
		<ItemList items={topics} bind:selectedItem itemName="Topic" />
	</Panel>

	<Panel title="Editor">
		{#if selectedItem}
			<MatcherEditor {selectedItem} />
		{/if}
	</Panel>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: grid;
		grid-template-columns: 1fr 2fr;
		flex: 1;
		gap: 1rem;
		overflow: hidden;

		@media (max-width: 768px) {
			margin: 0.5rem;
			grid-template-columns: 1fr;
			overflow-y: visible;
		}
	}
</style>
