<script lang="ts">
	import { UserRole } from '$lib/models/user';
	import Header from '../lib/header.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { user } = data;
</script>

<main id="main">
	<Header role={user?.role ?? UserRole.default}/>

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

  @font-face {
		font-family: 'proximanova-bold';
		font-style: normal;
		font-weight: 500;
		src: url('/prox-bold.otf');
	}

	:global(button) {
		all: unset;
		cursor: pointer;

		font-family: 'proximanova-regular', sans-serif;
		font-style: normal;
		font-weight: 500;
	}

	:global(.button) {
    display: flex;
    align-items: center;
    justify-content: center;
		background-color: $highlight;
		border: none;
		border-radius: 4px;
		color: white;
		text-align: center;
		height: 2rem;
		padding: 0 1rem;
    text-transform: uppercase;
    font-size: 14px;
		font-family: 'proximanova-bold', 'proximanova-regular', sans-serif;

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

  :global(.button.cancel) {
    background-color: $shade-4;
    color: black;

    &:hover {
			background-color: lighten($shade-4, 5%);
		}
	}

	:global(h1, h2, h3, h4, p) {
		margin: 0;
		padding: 0;
	}

  :global(h1, h2) {
		font-family: 'proximanova-bold', 'proximanova-regular', sans-serif;
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
		max-height: 100vh;
		background-color: $shade-6;
	}
</style>
