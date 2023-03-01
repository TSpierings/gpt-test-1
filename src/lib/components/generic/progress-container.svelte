<script lang="ts">
	export let items: number;
	export let selected: number;

  export let tip: string = '';
  export let tipLevel: number = 0;

  export let finishText = 'Finish';
  export let cancelText = 'Cancel';

	export let onCancel = () => {};
	export let onFinish = () => {};

	export let canContinue = true;

	let clickBack = () => {
		if (selected > 0) {
			selected -= 1;
		} else {
			onCancel();
		}
	};

	let clickNext = () => {
		if (selected === items - 1) {
			onFinish();
		} else {
			selected += 1;
		}
	};
</script>

<div class="progress-container">
	<div class="content">
    <div class="slot">
      <slot />
    </div>		

    {#if tip}
      <span class={`tip level${tipLevel}`}>{tip}</span>
    {/if}
		<div class="menu">
			<button class="button cancel" type="button" on:click={clickBack}
				>{selected === 0 ? cancelText : 'Back'}</button
			>
			<div class="indicator">
				{#each Array(items) as _, index (index)}
					<div class={`dot ${selected === index ? 'active' : ''}`} />
				{/each}
			</div>
			<button disabled={!canContinue} class="button" type="button" on:click={clickNext}
				>{selected === items - 1 ? finishText : 'Next step'}</button
			>
		</div>
	</div>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.progress-container {
		display: flex;
		flex-direction: column;

		.content {
      display: flex;
      flex-direction: column;
			padding: 1.5rem 3rem 0.5rem 3rem;
			flex: 1;
			background-color: $shade-7;
      gap: 1.5rem;

      @media (max-width: 768px) {
        padding: 1.5rem 1rem;
      }

      .slot {
        flex: 1;
      }

			.menu {
				display: flex;
				align-items: center;
				justify-content: space-between;
				justify-self: flex-end;
				gap: 1.5rem;

				.button {
					flex: 1;
				}
			}
		}

		.indicator {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 3rem;
			background-color: transparent;
			gap: 8px;

			.dot {
				height: 8px;
				width: 8px;
				border-radius: 50%;
				background-color: $shade-5;

				&.active {
					background-color: $shade-3;
				}
			}
		}

    .tip {
      font-size: 14px;
      align-self: center;
      color: $shade-4;
      font-family: 'proximanova-bold', 'proximanova-regular', sans-serif;

      &.level1 {
        color: #AD0B0B;
      }
    }
	}
</style>
