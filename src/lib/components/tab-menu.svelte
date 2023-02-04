<script lang="ts">
	import TabMenuItem from './tab-menu-item.svelte';

	export let tabs = ['Placeholder tab'];
	export let onSelected: (index: number) => void;

	const select = (index: number) => {
		if (selected !== index) {
			selected = index;
			onSelected(index);
		}
	};
	let selected = 0;
</script>

<menu>
	{#each tabs as tab, index}
		<TabMenuItem title={tab} {index} selected={selected === index} onClick={select} />
	{/each}
</menu>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	menu {
		list-style-type: none;
		margin: 0;
		padding: 0.2em 0 0 0.2em;
		display: flex;
	}
</style>
