<header>
	<a href="/"><img src="/logo.png" alt="logo" /></a>
</header>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5em 1em 0.2em 2em;
		background-color: $shade-7;
		box-shadow: 0px 0.1em 0.1em rgba(0, 0, 0, 0.1);
		margin-bottom: 0.1em;

		a {
			color: white;
			font-weight: bold;
			text-decoration: none;

			&:hover {
				color: $color-primary-focus;
			}
		}
	}
</style>
