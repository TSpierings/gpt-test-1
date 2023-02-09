<script>
	export let title = 'Default';
	export let description = 'No description';
</script>

<li>
	<a href="writer/{title.toLowerCase()}">
		<h2>{title}</h2>
		<div class="divider" />
		<p>{description}</p>
	</a>
</li>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

  a {
		color: black;
		padding: 1em;
		text-decoration: none;
  }

	li {
		display: flex;
		flex-direction: column;
		background-color: $shade-7;
		margin: 2em;
		border-radius: 1em;
		color: black;

		&:hover {      
      background-color: $selected;
			cursor: pointer;
		}

		h2 {
			margin: 0;
      color: black;
			font-size: 24px;
		}

		.divider {
			height: 0.1em;
			margin: 0.5em 0;
			background-color: $shade-5;
		}

		p {
			margin: 0;
		}
	}
</style>
