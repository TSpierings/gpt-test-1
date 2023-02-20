<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
</script>

<div id="container">
	<div>
		<span>Login using one of the following methods:</span>
		<button on:click={() => signIn('github')}>Sign In using GitHub</button>
		<button on:click={() => signIn('google')}>Sign In using Google</button>
	</div>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	#container {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		div {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: $shade-7;
			border-radius: 1em;
			padding: 1em;

			button {
				font: inherit;
				background-color: $highlight;
				font-weight: bold;
				border: none;
				border-radius: 0.5em;
				color: white;
				text-align: center;
				height: 2em;
				margin-top: 1em;
				padding: 0 1em;

				&:hover {
					cursor: pointer;
					background-color: lighten($highlight, 5%);
					color: white;
				}

				&:disabled {
					cursor: unset;
					background-color: $shade-5;
					color: $shade-4;
				}
			}
		}
	}
</style>
