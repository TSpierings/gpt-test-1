<script lang="ts">
	import Divider from './generic/divider.svelte';

	export let sections: Array<string>;

	const removeSection = (index: number) => {
		sections = sections.filter((_, i) => i !== index);
	};

	const addSection = () => {
		sections = [...sections, 'New section'];
	};
</script>

<h2>Speech structure</h2>
<Divider />
<div class="speech-structure">
  <input type="hidden" name="section-count" value={sections.length} />
	{#each sections as section, index}
		<section>
			<div class="section-head">
				<span class="section-name">
					<h4>Section {index + 1}: </h4>
					<input name="Section {index}" bind:value={section} />
				</span>				
				<button type="button" on:click={() => removeSection(index)}>Remove</button>
			</div>
			<div class="text-placeholder" style="margin-right: {Math.random() * 10}em;" />
			<div class="text-placeholder" style="margin-right: {Math.random() * 10}em;" />
			<div class="text-placeholder" style="margin-right: {Math.random() * 10}em;" />
			<div class="text-placeholder" style="margin-right: {Math.random() * 10}em;" />
		</section>
	{/each}
	<button type="button" on:click={addSection}>Add section</button>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	h2 {
		margin: 0;
		padding: 0;
	}

	.speech-structure {
		display: grid;
		row-gap: 1em;
	}

	section {
		margin: 0;
		padding: 1em;
		background-color: $shade-6;
		border-radius: 0.5em;
		color: $text-dark;

		.section-head {
			display: flex;
			margin-bottom: 1em;

			.section-name {
				flex: 1;
			}

			button {
				font-size: small;
				height: 1.5em;
				background-color: $error;

				&:hover {
					background-color: lighten($error, 5%);
				}
			}
		}

		h4, p {
			margin: 0;
			padding: 0;
		}

		h4 {
			display: block;
			font-size: small;

			@media (min-width: 768px) {
				display: inline;
			}
		}

		input {
			border: 1px solid $shade-4;
			outline: none;
			border-radius: 0.5em;
			max-width: 7em;

			&:focus {
				border-color: $highlight;
			}
		}

		.text-placeholder {
			height: 1em;
			background-color: $shade-5;
			margin-bottom: 0.25em;
		}
	}

	button {
		font: inherit;
		background-color: $highlight;
		font-weight: bold;
		margin-bottom: 0.5em;
		border: none;
		border-radius: 0.5em;
		color: white;
		text-align: center;
		height: 2em;

		&:hover {
			cursor: pointer;
			background-color: lighten($highlight, 5%);
			color: white;
		}
	}
</style>
