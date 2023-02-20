<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Divider from '$lib/components/generic/divider.svelte';
	import Panel from '$lib/components/generic/panel.svelte';
	import ProgressBar from '$lib/components/generic/progress-bar.svelte';
	import { SpeechTypes } from '$lib/speeches/speech';
	import type { PageData } from './$types';
	import HackathonPitchInputs from './components/hackathon-pitch-inputs.svelte';
	import SpeechInputs from './components/speech-inputs.svelte';

	export let data: PageData;
	let { speech } = data;

	const milestones = ['Basics', 'Draft', 'Summary'];

	let progress = 0;
</script>

<form
  action=""
  autocomplete="off"
	method="post"
  use:enhance={({ form, data, action, cancel }) => {
    // `form` is the `<form>` element
    // `data` is its `FormData` object
    // `action` is the URL to which the form is posted
    // `cancel()` will prevent the submission

    return async ({ result, update }) => {
      // `result` is an `ActionResult` object
      // `update` is a function which triggers the logic that would be triggered if this callback wasn't set
    };
  }}
>
  <input class="hidden" name="id" value={speech.id} />
	<div class="progress-bar">
		<ProgressBar {milestones} {progress} />
	</div>

	<Panel title="Inputs">
		<div class="input-container">
			<SpeechInputs bind:speech={speech} />
      
      <Divider />

      {#if speech.type === SpeechTypes.HackathonPitch}
        <HackathonPitchInputs bind:speech={speech} />
      {/if}

      <Divider />

      <div class="menu-options">
        <button class="button" formaction="?/save">Save</button>
        <button class="button" type="button" on:click={() => goto('/me')}>Discard</button>
      </div>
		</div>
	</Panel>
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	form {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr min-content;
		margin: 1em 2em;
		gap: 2em;

		@media (min-width: 768px) {
			grid-template-columns: 1fr 1fr 1fr;
		}

		.progress-bar {
			grid-column: 1 / -1;
		}

		.input-container {
			display: grid;
			row-gap: 1em;
		}

    .menu-options {
      display: flex;
      gap: 1em;
      
      button {
        flex: 1;
      }
    }
	}
</style>
