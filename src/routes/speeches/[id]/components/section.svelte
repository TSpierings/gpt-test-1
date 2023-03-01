<script lang="ts">
	import type { Topic } from '$lib/speeches/speech';

	export let topic: Topic;
</script>

<section>
	<header>
		<h2>{topic.title}</h2>
	</header>
		{#if topic.cursor >= 0}
			<textarea rows={8} bind:value={topic.content[topic.cursor]}/>
		{:else}
			<div class="paragraph">
				<div class="text-placeholder" style="margin-right: {Math.random() * 10}rem;" />
				<div class="text-placeholder" style="margin-right: {Math.random() * 10}rem;" />
				<div class="text-placeholder" style="margin-right: {Math.random() * 10}rem;" />
				<div class="text-placeholder" style="margin-right: {Math.random() * 10}rem;" />
			</div>
		{/if}
</section>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	section {
		display: flex;
		min-height: 10rem;
		flex-direction: column;
		gap: 1rem;

		header {
			padding: 0.5rem 1rem;
			border: 1px solid $shade-5;
		}

		.paragraph {
			padding-left: 1rem;
			border-left: 1px solid $shade-5;
		}

		.text-placeholder {
			height: 1rem;
			background-color: $shade-5;
			margin-bottom: 0.25rem;
		}

		textarea {
			padding-left: 1rem;
			border: none;
			border-left: 1px solid $shade-5;
			width: calc(100% - 1rem);
			outline: none;
			resize: vertical;
			border-radius: 2px;
			font-family: 'proximanova-regular', sans-serif;
			font-size: 16px;

			&:focus {
				border-color: $highlight;
			}
		}
	}
</style>
