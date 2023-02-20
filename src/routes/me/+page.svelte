<script lang="ts">
	import Panel from '$lib/components/generic/panel.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { speeches } = data;
</script>

<div id="speech-list">
	<form method="post" action="?/create">
		<button id="create-speech"> Create new speech </button>
	</form>
	{#each speeches as speech}
		<Panel title={speech.inputs.title} description="An empty speech" />
	{/each}
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	#speech-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, 20em);
		gap: 2em;
		margin: 1.5em;

		form {
			display: contents;
		}

		#create-speech {
			text-align: center;
			border-radius: 2em;
			border: 2px dashed lighten($shade-1, 40%);
			color: lighten($shade-1, 40%);

			&:hover {
				border-color: $highlight;
				color: $highlight;
			}
		}
	}
</style>
