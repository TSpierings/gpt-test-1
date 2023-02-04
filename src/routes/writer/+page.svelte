<script>
  import CategoryCard from "../../lib/components/category-card.svelte";
</script>

<menu>
  <CategoryCard categoryName='Pitch' imageUrl='pitch-icon.png' />
  <CategoryCard categoryName='Wedding' imageUrl='wedding-icon.png'/>
  <CategoryCard categoryName='Funeral' imageUrl='funeral-icon.png'/>
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