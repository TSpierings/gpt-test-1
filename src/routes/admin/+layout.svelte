<script lang="ts">
	import { UserRole } from '$lib/models/user';
	import type { PageData } from './$types';
	import MenuBar from './components/menu-bar.svelte';

	export let data: PageData;

	const { user } = data;
</script>

<MenuBar role={user.role ?? UserRole.default}/>

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
