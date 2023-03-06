<script lang="ts">
	import { UserRole } from "$lib/models/user";

	export let role: UserRole;
</script>

<div class="admin-menu">
	<a href="/admin/speech-types">Speech types</a>
	<a href="/admin/topics">Topics</a>
	{#if role === UserRole.admin}
		<a href="/admin/users">Users</a>
	{/if}
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
