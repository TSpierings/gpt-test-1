<script>
	import { goto } from '$app/navigation';
	import Divider from '$lib/components/generic/divider.svelte';
</script>

<div class="container">
	<button class="item" on:click={() => goto('/speeches/new')}>
		<h2>Start creating a new speech!</h2>
		<Divider />
		<p>Click to go the speeching engine</p>
	</button>
	<button class="item" on:click={() => goto('/speeches')}>
		<h2>My speeches</h2>
		<Divider />
		<p>Click to go your saved speeches</p>
	</button>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 2rem;
		gap: 2rem;
		flex: 1;

		@media (max-width: 768px) {
			flex-direction: column;
			justify-content: unset;
			align-items: unset;

			.item {
				flex: 1;
			}
		}

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
			background-color: $shade-7;
			grid-column: 1 / -1;
			border: 1px solid $shade-5;
			border-radius: 4px;
			padding: 1.5rem;
			min-height: 100px;
			cursor: pointer;
			text-align: center;

			&:hover {
				background-color: $shade-6;
				border-color: $highlight;
			}
		}
	}
</style>
