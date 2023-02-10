<script>
	import Divider from '$lib/components/generic/divider.svelte';
	import { Flows } from '$lib/flows';
	import CategoryCard from '../lib/components/generic/category-card.svelte';
</script>

<div class="container">
	<div class="welcome">
		<h2>Welcome to the Speeching.ai pitch engine</h2>
		<Divider />
		<p>Below are a set of speech flows you can try out</p>
	</div>
	{#each Flows as flow}
		<CategoryCard description={flow.description} />
	{/each}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		margin: 2em;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2em;

		.welcome {
			display: flex;
			flex-direction: column;
			background-color: $shade-7;
			grid-column: 1 / -1;
			border-radius: 2em;
			padding: 1.5em;

			h2,
			p {
				margin: 0;
				padding: 0;
			}
		}
	}
</style>
