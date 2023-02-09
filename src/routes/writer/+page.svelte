<script>
  import { Flows } from "$lib/flows";
import CategoryCard from "../../lib/components/category-card.svelte";
</script>

<menu>
  {#each Flows as flow}
    <CategoryCard title={flow.title} imageUrl={flow.image} />
  {/each}
</menu>

<style lang="scss">
  @use '/src/lib/colors.scss' as *;

  menu {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
</style>