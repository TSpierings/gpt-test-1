<script lang="ts">
	export let milestones = ['Default'];
	export let progress = 0;
</script>

<div class="wrapper">
	<div class="milestones">
		{#each milestones as milestone, index}
			<span class={progress > index - 1 ? 'reached' : undefined}>{milestone}</span>
		{/each}
	</div>

	<div class="feature">
		{#each milestones as _, index}
			<div class={progress > index - 1 ? 'circle reached' : 'circle'} />
			{#if index < milestones.length - 1}
				<div class={progress > index - 1 ? 'bar reached' : 'bar'} />
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.wrapper {
		display: flex;
		flex-direction: column;

		.milestones {
			display: flex;
			justify-content: space-around;

			span {
				flex: 1;
				text-align: center;
				font-weight: bold;
				color: $shade-4;
				padding: 0.5em 0;

				&:first-of-type {
					text-align: start;
					margin-left: 0.25em;
				}

				&:last-of-type {
					text-align: end;
					margin-right: 0.25em;
				}

				&.reached {
					color: black;
				}
			}
		}

		.feature {
			display: flex;
			align-items: center;
			justify-content: space-around;

			.circle {
				min-height: 0.7em;
				min-width: 0.7em;
				background-color: $shade-7;
				border: 0.15em solid $shade-4;
				border-radius: 50%;

        &.reached {
          min-height: 0.5em;
          min-width: 0.5em;
          background-color: $shade-7;
          border: 0.25em solid $highlight;
        }
			}

			.bar {
				flex: 1;
				height: 2px;
				background-color: $shade-4;

        &.reached {
          background-color: $highlight;

          background: $highlight;
          background: linear-gradient(90deg, $highlight 0%, $highlight 30%, $shade-4 100%);
        }
			}
		}
	}
</style>
