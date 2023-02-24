<script lang="ts">
	import { enhance } from '$app/forms';
	import ProgressContainer from '$lib/components/generic/progress-container.svelte';
	import type { PageData } from './$types';
	import GetStarted from './components/get-started.svelte';
	import SelectTopics from './components/select-topics.svelte';
	import TopicContent from './components/topic-content.svelte';
	import TopicRating from './components/topic-rating.svelte';

	export let data: PageData;
	let { speech } = data;

  let selected = 0;
  let tips: Array<string> = [];
  $: {
    tips = ['', `Pro tip: select ${Math.max(0, 3 - speech?.topics?.length ?? 0)} more topics`, 'You\'re almost there!, we promise...', ''];
  }

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

  <ProgressContainer items={4} bind:selected tip={tips[selected]} tipLevel={selected === 1 ? 1 : 0} finishText="Show draft">
    {#if selected === 0}
      <GetStarted bind:speech/>
    {:else if selected === 1}
      <SelectTopics bind:speech />
    {:else if selected === 2}
      <TopicContent bind:speech />
    {:else if selected === 3}
      <TopicRating bind:speech />
    {/if}
  </ProgressContainer>
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	form {
    display: flex;
    align-items: start;
    justify-content: center;
    margin: 3rem 1.5rem;

		@media (max-width: 768px) {
      align-items: unset;
			margin: 0.5rem;
      flex: 1;
		}
	}
</style>
