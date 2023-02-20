<script lang="ts">
	import { goto } from '$app/navigation';
	import Panel from '$lib/components/generic/panel.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { speeches } = data;
</script>

<div class="speech-list">
	<form method="post" action="?/create">
		<button class="create-speech"> Create new speech </button>
	</form>
	{#each speeches as speech}
    <button type="button" on:click={() => goto(`/me/speech/${speech._id}`)} class="contents">
      <Panel title={speech.inputs.title} description="An empty speech" />
    </button>
	{/each}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.speech-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
		gap: 2em;
		margin: 1.5em;

		form {
			display: contents;
		}

		.create-speech {
			text-align: center;
			border-radius: 2em;
			border: 2px dashed lighten($shade-1, 40%);
      min-height: 5em;

			&:hover {
				border-color: $highlight;
				color: $highlight;
			}
		}

    .contents {
      display: contents;
    }
	}
</style>
