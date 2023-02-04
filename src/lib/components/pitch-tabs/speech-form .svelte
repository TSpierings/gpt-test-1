<script lang="ts">
	import TextInputField from '$lib/components/text-input-field.svelte';
	import type { PitchSpecificInput } from '$lib/pitch-processor';

	export let formData: PitchSpecificInput;
</script>

<form>
	<TextInputField label={'Speech goal'} bind:value={formData.speechGoal} />
  <TextInputField label={'Audience specifics'} bind:value={formData.audienceSpecifics} />
  <TextInputField label={'Extra information'} bind:value={formData.extraInfo} />
  <TextInputField label={'Speech duration'} bind:value={formData.speechDuration} rows={1} />
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

  form {
    display: flex;
    flex-direction: column;
  }
</style>