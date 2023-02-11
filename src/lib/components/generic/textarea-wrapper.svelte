<script lang="ts">
	export let value: Array<string>;
  export let cursor: number;
</script>

<textarea name={`section-content}`} bind:value={value[cursor]} rows={6} />

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	textarea {
		border: 1px solid $shade-4;
		outline: none;
		border-radius: 0.5em;
		padding: 0.5em;
		resize: vertical;
		font-family: 'proximanova-regular', sans-serif;

		&:focus {
			border-color: $highlight;
		}
	}
</style>
