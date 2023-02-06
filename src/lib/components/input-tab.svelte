<script lang="ts">
	import TextInputField from '$lib/components/text-input-field.svelte';
	import type { DataField } from '$lib/flows';

	export let dataFields: Array<DataField>;
</script>

<div>
	{#each dataFields as field}
		<TextInputField
			name={field.name}
			label={field.label}
			bind:value={field.value}
			rows={field.rows}
		/>
	{/each}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	div {
		display: flex;
		flex-direction: column;
	}
</style>
