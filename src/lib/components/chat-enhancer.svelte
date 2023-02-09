<script lang="ts">
	import Divider from "./generic/divider.svelte";

</script>

<div title="container">
	<h1>Enhancer</h1>
  <Divider />
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	div {
		display: flex;
		flex-direction: column;
    margin: 2em 0 1em 0;
		padding: 1.5em;
		background-color: $shade-7;
		color: black;
		border-radius: 2em 2em;
    grid-column: span 3;

    h1 {
      margin: 0;
      padding: 0;
    }
	}
</style>
