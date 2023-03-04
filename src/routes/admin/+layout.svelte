<script>

	import MenuBar from "./components/menu-bar.svelte";

</script>
<MenuBar />

<main>
  <slot />
</main>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

  main {
    flex: 1;
    padding: 1rem;
  }
</style>