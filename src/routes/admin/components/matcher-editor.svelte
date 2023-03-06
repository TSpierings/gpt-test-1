<script lang="ts">
	import TextInputField from '$lib/components/generic/text-input-field.svelte';
	import type { PromptMatcher } from '$lib/speeches/matchers';

	export let selectedItem: PromptMatcher;
</script>

<form method="post" action="?/create" autocomplete="off">
	<TextInputField name="title" label="Title" value={selectedItem.title} rows={1} />
	<TextInputField name="matcher" label="Prompt matcher" value={selectedItem.prompt} rows={4} />
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
		gap: 0.5rem;

		.menu {
			display: flex;
			gap: 0.5rem;
		}
	}
</style>
