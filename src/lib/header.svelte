<header>
	<a href="/writer"><h1>Speechify</h1></a>
</header>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5em 1em;
		background-color: $shade-1;

		a {
			color: white;
			font-weight: bold;
			text-decoration: none;

			&:hover {
				color: $color-primary-focus;
			}
		}

		h1 {
			margin: 0.3em;
			padding: 0;
			color: white;
			text-decoration: none;
		}
	}
</style>
