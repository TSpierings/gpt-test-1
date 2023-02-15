<script>
	import { page } from '$app/stores';

  console.log($page.data.session)
</script>

Wow you're authenticated!

{#if $page.data.session}
	Hello {$page.data.session.user?.name}
{/if}
