<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { Speech } from '$lib/speeches/speech';
	import { currentSpeech } from '$lib/stores/speech';
	import type { PageData } from './$types';
	import Draft from './components/draft.svelte';
	import InitialInput from './components/initial-input.svelte';

	export let data: PageData;
	let { speech } = data;

	currentSpeech.set(speech);
	currentSpeech.subscribe((value: Speech) => (speech = value));

	let form: HTMLFormElement;
</script>

<form
	bind:this={form}
	action="?/save"
	autocomplete="off"
	method="post"
	use:enhance={({ form, data, action, cancel }) => {
		data.set('json-speech', JSON.stringify(speech));

		return async ({ result, update }) => {
			if (result.status === 200 && result.type === 'success' && result.data?.id) {
				console.log(`new id is ${result.data.id}`);
				currentSpeech.set({ ...speech, id: result.data.id });
			}
		};
	}}
>
	<InitialInput bind:speech />
	<Draft bind:speech />
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	form {
		display: grid;
		grid-template-columns: 1fr 2fr;
		margin: 3rem;
		flex: 1;
		gap: 1px;
		overflow: hidden;

		@media (max-width: 768px) {
			margin: 0.5rem;
			grid-template-columns: 1fr;
			overflow-y: visible;
		}
	}
</style>
