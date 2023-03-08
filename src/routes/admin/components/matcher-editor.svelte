<script lang="ts">
	import TextInputField from '$lib/components/generic/text-input-field.svelte';
	import type { PromptMatcher } from '$lib/speeches/matchers';

	export let selectedItem: PromptMatcher;
	export let description: string | undefined = undefined;
	export let rows: number = 4;
</script>

<form method="post" action="?/create" autocomplete="off">
	{#if description}
		<p>{description}</p>
	{/if}
	<TextInputField name="title" label="Title" value={selectedItem.title} rows={1} />
	<TextInputField name="matcher" label="Prompt matcher" value={selectedItem.prompt} rows={rows} />
	<div class="menu">
		<button class="button">Update</button>
		<button formaction="?/delete" class="button delete">Delete</button>
	</div>
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.menu {
			display: flex;
			gap: 0.5rem;
		}
	}
</style>
