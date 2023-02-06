<script>
  import Header from '../lib/header.svelte'
</script>

<main id="main">
  <Header/>

  <slot/>
</main>

<style lang="scss">
  @use '/src/lib/colors.scss' as *;

  * {
    font-family: sans-serif;
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>