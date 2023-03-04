<script lang="ts">
	import Dropdown from '$lib/components/generic/dropdown.svelte';
	import TextInputField from '$lib/components/generic/text-input-field.svelte';
	import type { PromptMatcher } from '$lib/speeches/matchers';
	import { ToneOfVoice, type Speech } from '$lib/speeches/speech';

	export let speech: Speech;
	export let speechTypes: PromptMatcher[];

  let lengthOptions = ['5 mins'];
  let speechLength: string;

  $: {
    speech.lengthInSeconds = speechLength === lengthOptions[0] ? 300 : 0;
  }
</script>

<div class="container">
	<h2>Get started</h2>
	<p>
		To get to your perfect speech we need some input. This will take about 5 minutes to fill in.
	</p>
	<TextInputField bind:value={speech.title} label="Title of your speech" name="inputs.title" rows={1} />

  <div class="double">
    <Dropdown label="Speech type" options={speechTypes.map((item) => item.title)} bind:value={speech.type} />
    <Dropdown label="Speech length" options={lengthOptions} bind:value={speechLength} />
  </div>

  <Dropdown label="Tone of voice" options={Object.values(ToneOfVoice)} bind:value={speech.toneOfVoice} />

	<TextInputField
		bind:value={speech.targetAudience}
		label="Target audience"
		name="target-audience"
		placeholder="Example: A group of informal investors with knowledge about the basics of quantum physics"
		rows={4}
	/>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h2 {
			margin: 0.5rem 0;
			font-weight: bolder;
		}

		p {
			margin-bottom: 1rem;
		}

    .double {
      display: flex;
      flex: 1;
      gap: 4px;
    }
	}
</style>
