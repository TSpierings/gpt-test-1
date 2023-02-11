<script lang="ts">
	import { enhance } from '$app/forms';
	import FlowPanel from '$lib/components/flow-panel.svelte';
	import PreviewPanel from '$lib/components/preview-panel.svelte';
	import ProgressBar from '$lib/components/generic/progress-bar.svelte';
	import type { PageData } from './$types';
	import DraftPanel from '$lib/components/draft-panel.svelte';
	import DraftOptions from '$lib/components/draft-options.svelte';
	import DraftMutation from '$lib/components/draft-mutation.svelte';
	import type { MutationOption, SpeechSection } from '$lib/flows';
	import SummarisePanel from '$lib/components/summarise-panel.svelte';
	import SummariseOptions from '$lib/components/summarise-options.svelte';

	export let data: PageData;

	let speechHistory: Array<SpeechSection> = [];
	let speechResult = '';
	let sections = ['Problem', 'Solution', 'Benefit', 'Conclusion'];
	let progress = 0;
	let loading = false;

	let openedMutation: MutationOption | undefined;
	let mutations: Array<MutationOption> = [
		{
			code: 'add-question',
			title: 'Question to the audience',
			description:
				'Incorporating audience questions into the introduction of a pitch can be beneficial as it allows for interaction and engagement, reducing your nerves and making the audience feel more involved in the presentation.',
			placeholder: 'If you have an idea about type of question you want to ask, let me know',
			enabled: false
		},
		{
			code: 'personal-story',
			title: 'Incorporate a personal story',
			description:
				'Adding a personal story humanizes the speaker and creates a connection, making the pitch more memorable and relatable.',
			placeholder: 'Tell me more about the story you want to share.',
			enabled: false
		},
		{
			code: 'catchy-summary',
			title: 'Add a catchy summary of your solution ',
			description: `Including an analogy in intro simplifies audience's understanding of the product by relating it to something familiar, making it more memorable and effective.`,
			placeholder:
				'For example: with speeching AI we want to be the Canva of pitches, enabling everyone to easily create their own story',
			enabled: false
		},
		{
			code: 'highlight-problem',
			title: 'Highlight the problem more clearly',
			description:
				'When a problem is clearly highlighted, it establishes the urgency and necessity for a solution. By clearly outlining the problem, you not only grab the attention of your audience, but also create a roadmap for the solution that your product or idea provides.',
			placeholder: 'If there are specific elements you want to highlight, let me know.',
			enabled: false
		},
		{
			code: 'add-quote',
			title: `Add a famous quote`,
			description: `The use of famous quotes in an introduction can serve to add credibility and authority to the speaker's message. Additionally, a well-chosen quote can add emotional impact, engage the audience, and create a memorable moment in the introduction.`,
			placeholder: `There's nothing wrong with standing on shoulders of giants`,
			enabled: false
		},
		{
			code: 'reference-circumstance',
			title: `Add a reference to the specific circumstance you're in`,
			description:
				'Incorporating observations about your context into your presentation helps to connect with the audience and make the presentation relatable and memorable. It also adds a personal touch and can set a lighthearted tone for the rest of the presentation.',
			placeholder: `What's the observation you want to include? IE: I'm wearing an orange sweater or we lost half our team while writing this pitch`,
			enabled: false
		}
	];

	let parseHistory = () => '';

	$: {
		parseHistory = () =>
			speechHistory
				.map((section) => {
					return `${section.title}:\n${section.history[section.cursor]}`;
				})
				.join('\n');
	}
</script>

<form
	autocomplete="off"
	method="post"
	use:enhance={({ form, data, action, cancel }) => {
		console.log(data);
		loading = true;

		if (action.search === '?/mutate') {
			return async ({ result }) => {
				loading = false;

				if (result.type === 'success') {
					const paragraph = result.data?.result?.choices[0]?.text;
					const selectedSection = data.get('selected-section');

					console.log(`Selected section: ${data.get('selected-section')}`);

					const speechSection = speechHistory.find((section) => section.title === selectedSection);
					if (speechSection) {
						speechSection.history.push(paragraph.trim());
						speechSection.cursor = speechSection.history.length - 1;
					}
				}
			};
		}

		if (action.search === '?/summarise') {
			progress = 2;
			loading = true;

			return async ({ result, update }) => {
				if (result.type === 'success') {
					loading = false;

					let text = result.data?.result?.choices[0]?.text;
					text = text.split('###');

					speechHistory.forEach((speechSection, index) => {
						speechSection.history.push(text[index].trim());
						speechSection.cursor++;
					});

					speechHistory = [...speechHistory];

					console.log(speechHistory);
				}
			};
		}

		progress = 1;
		loading = true;

		if (speechHistory.length === 0) {
			speechHistory = sections.map((section) => {
				return {
					title: section,
					history: [''],
					cursor: 0
				};
			});
		}

		return async ({ result, update }) => {
			loading = false;

			if (result.type === 'success') {
				speechResult = result.data?.result?.choices[0]?.text;
        // let text = speechResult.split('###');
				speechHistory = sections.map((section, index) => {
          // const pro = text[index].replaceAll('\n', '');

					return {
						title: section,
						history: [RegExp(`${section}: (.+)`, 'g').exec(speechResult)?.at(1) ?? ''],
						cursor: 0
					};
				});
			}
		};
	}}
	action="?/prompt"
>
	<textarea hidden name="speech-result" value={parseHistory()} />
	<div class="progress-bar">
		<ProgressBar milestones={['Basics', 'Draft', 'Summary']} {progress} />
	</div>

	<div class={progress === 0 ? 'contents' : 'hidden'}>
		<FlowPanel bind:steps={data.flow.steps} />
		<PreviewPanel bind:sections steps={data.flow.steps} />
	</div>

	<div class={progress === 1 ? 'contents' : 'hidden'}>
		<DraftPanel bind:speechHistory {loading} />
		{#if openedMutation !== undefined}
			<DraftMutation mutation={openedMutation} back={() => (openedMutation = undefined)} />
		{:else}
			<DraftOptions bind:openedMutation {mutations} />
		{/if}
	</div>

	<div class={progress === 2 ? 'contents' : 'hidden'}>
		<SummarisePanel {loading} {speechHistory} />
		<SummariseOptions />
	</div>
</form>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	form {
		flex: 1;
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

		.hidden {
			display: none !important;
		}

		.contents {
			display: contents;
		}
	}
</style>
