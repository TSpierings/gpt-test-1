<script lang="ts">
	import TextInputField from '$lib/components/generic/text-input-field.svelte';
	import type { DataField } from '$lib/flows';
	import Divider from './generic/divider.svelte';

	export let dataFields: Array<DataField>;
	export let title: string = 'Default';
</script>

<h2>{title}</h2>
<Divider />
<div class="grid">
	{#each dataFields as field}
		<TextInputField label={field.label} bind:value={field.value} rows={field.rows} />
	{/each}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	h2 {
		margin: 0;
		padding: 0;
	}

	.grid {
		display: grid;
		row-gap: 1em;
	}
</style>
