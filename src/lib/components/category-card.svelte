<script>
	export let categoryName = 'Default';
	export let imageUrl = '';
</script>

<li>
	<a href="writer/{categoryName.toLowerCase()}">
		<h2>{categoryName}</h2>
		<img src={imageUrl} alt="placeholder" />
	</a>
</li>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

  a {
    display: contents;
  }

	li {
		display: flex;
		flex-direction: column;
		background-color: white;
		margin: 2em;
		border-radius: 0.5em;
		border: 0.3em solid black;
		color: black;

		&:hover {      
      background-color: $shade-1;
			cursor: pointer;
      
      h2 {
        color: white;        
      }

			img {
				filter: none;
			}
		}

		h2 {
			margin: 0.5em;
      color: black;
		}

		img {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: $shade-6;
			color: black;
			filter: grayscale(0.8);
		}
	}
</style>
