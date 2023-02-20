<script lang="ts">
	import TextInputField from '$lib/components/generic/text-input-field.svelte';
	import type { HackathonPitch } from '$lib/speeches/hackathon-pitch';
	import type { Speech } from '$lib/speeches/speech';

	export let speech: Speech;
  let hackathonPitch = speech as HackathonPitch;

  $: {
    hackathonPitch = speech as HackathonPitch;
  }
</script>

<textarea rows={6} class="" name="speech" value={JSON.stringify(hackathonPitch)} />
<TextInputField
	bind:value={hackathonPitch.inputs.teamName}
	label={'Team name'}
	name="inputs.teamName"
	rows={1}
/>