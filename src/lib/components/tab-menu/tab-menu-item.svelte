<script lang="ts">
	import type { TabItem } from './tab-item';

	export let item: TabItem;

	export let index: number;
	export let selected = false;

	export let onClick: (index: number) => void;
</script>

<option
	disabled={item.disabled}
	on:click={() => onClick(index)}
	class={`${selected ? 'selected' : ''}`}
>
	{item.name}
</option>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	option {
		flex: 1;
		padding: 0.5em 1.5em;
		margin-right: 1em;
		background-color: $highlight;
		font-weight: bold;
		margin-bottom: 0.5em;
		border-radius: 0.5em;
		color: white;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;

		&:last-of-type {
			margin-right: 0;
		}

		&:hover {
			cursor: pointer;
			background-color: lighten($highlight, 5%);
			color: white;
		}

		&.selected {
			cursor: unset;
			background-color: $shade-7;
			border-bottom: 0.5em solid $shade-7;
			margin-bottom: 0;
			border-radius: 1em 1em 0 0;
			color: black;
		}

		&:disabled {
			cursor: unset;
			background-color: $shade-5;
			color: $shade-3;
		}
	}
</style>
