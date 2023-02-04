<script lang="ts">
	export let title: string;
	export let index: number;
	export let selected = false;

	export let onClick: (index: number) => void;
</script>

<option on:click={() => onClick(index)} class={selected ? 'selected' : undefined}>
	{title}
</option>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;
	option {
		flex: 1;
		padding: 0.5em;
		margin-right: 0.2em;
		background-color: $shade-1-5;
		color: $text-light;
		font-weight: bold;
		border-bottom: 0.5em solid white;

		&:hover {
			cursor: pointer;
			background-color: $shade-5;
			border-color: $shade-5;
			color: $text-dark;
		}

		&.selected {
			cursor: unset;
			background-color: $shade-1;
			border-color: $shade-1;
			color: $text-light;
		}
	}
</style>
