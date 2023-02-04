<script lang="ts">
	import SpeechFormcopy from '$lib/components/pitch-tabs/speech-form .svelte';
	import TabMenu from '$lib/components/tab-menu.svelte';
	import { ProcessPitchIntro, ProcessPitchSpeech, type PitchPromptData } from '$lib/pitch-processor';
	import IntroForm from '../../../lib/components/pitch-tabs/intro-form.svelte';

	let activeRightTab = 0;
	let latestResult = '';

	let activeLeftTab = 0;

	const selectRightTab = (index: number) => {
		activeRightTab = index;
	};

	const selectLeftTab = (index: number) => {
		activeLeftTab = index;
	};

	let formData: PitchPromptData = {
		intro: {
			companyName: 'Speechify',
			productDescription: 'creating hackathon pitches using GPT',
			solvingProblem: 'helping people write good pitches',
			features:
				'generating a draft pitch, refining it using targeted instruction and converting it to memorable notes',
			targetAudience: 'hackathon participants'
		},
		input: {
			speechGoal: 'sell an idea to a group of investors',
			audienceSpecifics: 'there are 4 tech sponsors present',
			extraInfo: 'The pitch needs to stand out',
			speechDuration: '5 minutes'
		}
	};
</script>

<div class="split-panel">
	<div class="left panel">
		<TabMenu tabs={['Intro', 'Speech', 'Draft', 'Refine', 'Finalize']} onSelected={selectLeftTab} />
		<section>
			{#if activeLeftTab === 0}
				<IntroForm bind:formData={formData.intro} />
			{:else if activeLeftTab === 1}
				<SpeechFormcopy bind:formData={formData.input} />
			{:else}
				<h3>There seems to be nothing here..</h3>
			{/if}
		</section>
	</div>
	<div class="right panel">
		<TabMenu tabs={['Prompt preview', 'Speech result']} onSelected={selectRightTab} />
		<section>
			{#if activeRightTab === 0}
				<h3>The following sections will be sent to GPT as a prompt</h3>
				<h4>Intro</h4>
				<p>{ProcessPitchIntro(formData.intro)}</p>
				<h4>Speech</h4>
				<p>{ProcessPitchSpeech(formData.input)}</p>
			{:else}
				<h3>Result</h3>
				<h4>Draft</h4>
				<p>latestResult</p>
			{/if}
		</section>
	</div>
</div>

<!-- <form method="post" action="?/prompt">
  <p>{data.title}</p>
  
  <input name="test" type="text"/>

  <button type="submit">Submit</button>
</form>


{#if form?.status}
  <p>got: {form?.result.choices[0].text}</p>
{/if} -->
<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	// p {
	//   color: $text-dark;
	// }

	.split-panel {
		display: flex;
		color: $text-dark;
		flex: 1;

		.panel {
			width: 50%;
			flex: 1;

			&.left {
				border-right: 1px solid $shade-2;
			}

			&.right {
				border-left: 1px solid $shade-2;
			}

			section {
				display: flex;
				flex-direction: column;
				flex: 1;
				margin: 0 0.2em;
				padding: 1em;
				background-color: $shade-1;
				color: $text-light;

				h3 {
					margin: 0;
				}

				h4 {
					display: flex;
					width: fit-content;
					margin: 1em 0 0 0;
					padding: 0.2em 0.5em;
					font-size: small;
					background-color: $shade-6;
					color: $text-dark;
					border-radius: 0.2em 0.2em 0 0;
				}

				p {
					margin: 0;
					padding: 1em;
					background-color: $shade-6;
					border-radius: 0 0.2em 0.2em 0.2em;
					color: $text-dark;
					font-weight: bold;
					white-space: pre-line;
				}
			}
		}
	}
</style>
