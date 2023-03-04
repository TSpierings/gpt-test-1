<div class="admin-menu">
  <a href="/admin/speech-types">Speech types</a>
  <a href="/admin/topics">Topics</a>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

  .admin-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 2rem;
    border-bottom: 1px solid $shade-5;
    padding: 0 1rem;

    a {
      color: black;
      text-decoration: none;

      &:hover {
        color: $highlight;
      }
    }
  }
</style>