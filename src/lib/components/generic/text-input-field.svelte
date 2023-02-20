<script lang="ts">
	export let value: string, label: string, name: string;
	export let rows: number = 4;
</script>

<div class="input-field">
	<label for={label}>{label}</label>
	{#if rows === 1}
		<input name={name} bind:value type="text" placeholder="Your input here" />
	{:else}
		<textarea name={name} {rows} bind:value placeholder="Your input here" />
	{/if}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.input-field {
		display: flex;
		flex-direction: column;
		margin: 0;

		label {
			margin-bottom: 0.4em;
			font-weight: bold;
		}

		input {
			border: 1px solid $shade-4;
			outline: none;
			border-radius: 0.5em;
			padding: 0.5em;

			&:focus {
				border-color: $highlight;
			}
		}

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
	}
</style>
