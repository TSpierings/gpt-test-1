<script lang="ts">
	import TextInputField from '$lib/components/text-input-field.svelte';
	import type { PitchIntro } from '$lib/pitch-processor';

	export let formData: PitchIntro;
</script>

<form>
	<TextInputField label={'Team name'} bind:value={formData.companyName} rows={1} />
  <TextInputField label={'Product description'} bind:value={formData.productDescription} />
  <TextInputField label={'What is the problem you\'re solving?'} bind:value={formData.solvingProblem} />
  <TextInputField label={'Product features'} bind:value={formData.features} />
  <TextInputField label={'Target audience'} bind:value={formData.targetAudience} />
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

  form {
    display: flex;
    flex-direction: column;
  }
</style>