<script lang="ts">
	import { clickOutside } from '$lib/directives/click-outside';

	export let options = ['One', 'Two'];
	export let value = options[0];
  export let label = 'Dropdown';

	let expanded = false;

	const toggleOptions = (open: boolean) => {
		expanded = open;
	};

	const selectOption = (option: string) => {
		if (value != option) {
			value = option;
		}

		expanded = false;
	};
</script>

<div class="dropdown-container">
	<label for={label}>{label}</label>
	<button type="button" class={`dropdown-value ${expanded ? 'focused' : ''}`} on:click={() => toggleOptions(true)}>{value}</button>
	{#if expanded}
		<div class="dropdown-options" use:clickOutside={() => toggleOptions(false)}>
			{#each options as option}
				<button type="button" on:click={() => selectOption(option)}>{option}</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.dropdown-container {
		position: relative;
		display: flex;
		flex-direction: column;
		margin: 0;
    flex: 1;

		label {
			margin-bottom: 0.4em;
			font-weight: bold;
      color: $shade-3-5;
      font-size: 12px;
      text-transform: uppercase;
		}

		.dropdown-value {
			flex: 1;
			border: 1px solid $shade-4;
			outline: none;
			border-radius: 2px;
			padding: 0.5em;
			cursor: pointer;
      font-size: 16px;

			&.focused {
				border-color: $highlight;
			}
		}

		.dropdown-options {
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 100%;
			width: 100%;
			background-color: $shade-7;
			border: 1px solid $shade-5;
			margin-top: 8px;
			border-radius: 2px;
			box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
      z-index: 1;

			button {
				padding: 0.5em 0.5em;
        font-size: 16px;
				border-bottom: 1px solid $shade-5;

				&:hover {
					background-color: $shade-6;
				}

				&:first-of-type {
					border-radius: 2px 2px 0 0;
				}

				&:last-of-type {
					border-bottom: unset;
					border-radius: 0 0 2px 2px;
				}
			}
		}
	}
</style>
