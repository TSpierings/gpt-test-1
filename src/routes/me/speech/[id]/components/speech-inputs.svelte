<script lang="ts">
	import Dropdown from '$lib/components/generic/dropdown.svelte';
	import TextInputField from '$lib/components/generic/text-input-field.svelte';
	import { SpeechTypes, type Speech } from '$lib/speeches/speech';

	export let speech: Speech;
</script>

<TextInputField bind:value={speech.inputs.title} label="Title" name="inputs.title" rows={1} />
<Dropdown label="Speech type" options={Object.values(SpeechTypes)} bind:value={speech.type}/>
