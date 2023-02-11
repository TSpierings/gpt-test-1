<script lang="ts">
	import type { MutationOption } from '$lib/flows';
	import Divider from './generic/divider.svelte';

	export let mutation: MutationOption;
  export let back = () => {};
</script>

<div class="container">
	<div class="title">
		<button type="button" on:click={back}>&#8592; back</button>
		<h2>{mutation.title}</h2>
	</div>
	<Divider />
	<div class="grid">
		<p>{mutation.description}</p>
		<textarea
			name="mutation-prompt"
			rows={4}
			placeholder={'Example: ' + mutation.placeholder}
		/>
		<button formaction="?/mutate">Generate</button>
	</div>

	<input hidden name="mutation-type" value={mutation.code} />
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.5em;
		background-color: $shade-7;
		color: black;
		border-radius: 2em;
		height: fit-content;
	}

	button {
		font: inherit;
		background-color: $highlight;
		font-weight: bold;
		margin-bottom: 0.5em;
		border: none;
		border-radius: 0.5em;
		color: white;
		text-align: center;
		height: 2em;

		&:hover {
			cursor: pointer;
			background-color: lighten($highlight, 5%);
			color: white;
		}
	}

	.title {
		display: flex;

		button {
			margin: 0 1em 0 0;
      height: unset;
		}

		h2 {
			display: inline;
		}
	}

	h2,
	p {
		margin: 0;
		padding: 0;
	}

	.grid {
		display: grid;
		row-gap: 1em;

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
