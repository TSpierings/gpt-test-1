<script lang="ts">
	import TabMenuItem from './tab-menu-item.svelte';

	export let tabs = ['Placeholder tab'];
	export let onSelected: (index: number) => void;
	export let selectedTab: number = 0;

	const select = (index: number) => {
		if (selectedTab !== index) {
			onSelected(index);
		}
	};
</script>

<menu>
	{#each tabs as tab, index}
		<TabMenuItem title={tab} {index} selected={selectedTab === index} onClick={select} />
	{/each}
</menu>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	menu {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
	}
</style>
