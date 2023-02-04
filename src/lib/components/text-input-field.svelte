<script lang="ts">
	export let value: string, label: string;
	export let rows: number = 4;
</script>

<p>
	<label for={label}>{label}</label>
	{#if rows === 1}
		<input bind:value type="text" />
	{:else}
		<textarea {rows} bind:value />
	{/if}
</p>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	p {
		display: flex;
		flex-direction: column;
		margin: 0.4em;
		margin-bottom: 0.8em;

		label {
			margin-bottom: 0.4em;
			font-size: small;
		}

    textarea {
      resize: vertical;
    }
	}
</style>
