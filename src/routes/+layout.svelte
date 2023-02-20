<script>
	import Header from '../lib/header.svelte';
</script>

<main id="main">
	<Header />

	<slot />
</main>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	@font-face {
		font-family: 'proximanova-regular';
		font-style: normal;
		font-weight: 500;
		src: url('/prox.otf');
	}

	:global(button) {
		all: unset;
		cursor: pointer;

		font-family: 'proximanova-regular', sans-serif;
		font-style: normal;
		font-weight: 100;
	}

	:global(.button) {
		background-color: $highlight;
		font-weight: bold;
		border: none;
		border-radius: 0.5em;
		color: white;
		text-align: center;
		height: 2em;
		padding: 0 1em;

		&:hover {
			cursor: pointer;
			background-color: lighten($highlight, 5%);
			color: white;
		}

		&:disabled {
			cursor: unset;
			background-color: $shade-5;
			color: $shade-4;
		}
	}

	:global(h1, h2, h3, h4, p) {
		margin: 0;
		padding: 0;
	}

	:global(input) {
		all: unset;

		font-family: 'proximanova-regular', sans-serif;
		font-style: normal;
		font-weight: 100;
		font-size: small;
	}

  :global(.hidden) {
    display: none;
  }

	* {
		font-family: 'proximanova-regular', sans-serif;
		font-style: normal;
		font-weight: 100;
	}

	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: $shade-6;
	}
</style>
