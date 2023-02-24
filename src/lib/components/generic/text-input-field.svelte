<script lang="ts">
	export let value: string, label: string, name: string, placeholder: string = "Your input here";
	export let rows: number = 4;
</script>

<div class="input-field">
	<label for={label}>{label}</label>
	{#if rows === 1}
		<input name={name} bind:value type="text" {placeholder} />
	{:else}
		<textarea name={name} {rows} bind:value {placeholder}/>
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
      color: $shade-3-5;
      font-size: 12px;
      text-transform: uppercase
		}

		input {
			border: 1px solid $shade-4;
			outline: none;
			border-radius: 2px;
			padding: 0.5em;
			font-weight: bold;
      font-size: 16px;

			&:focus {
				border-color: $highlight;
			}
		}

		textarea {
			border: 1px solid $shade-4;
			outline: none;
			border-radius: 2px;
			padding: 0.5em;
			resize: vertical;
			font-family: 'proximanova-regular', sans-serif;
      font-size: 16px;

			&:focus {
				border-color: $highlight;
			}
		}
	}
</style>
