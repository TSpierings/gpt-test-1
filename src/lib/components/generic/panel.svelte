<script lang="ts">
	import Divider from './divider.svelte';

	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
</script>

<div class="container">
	{#if title}
		<h2>{title}</h2>
	{/if}
	{#if description}
		<span>{description}</span>
	{/if}
	{#if title || description}
		<Divider />
	{/if}

	<slot />
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.5rem;
		background-color: $shade-7;
		color: black;

    span {
      margin-top: 0.5rem;
    }
	}
</style>
