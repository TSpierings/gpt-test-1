<script>
	import ProgressBar from '$lib/components/generic/progress-bar.svelte';
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
