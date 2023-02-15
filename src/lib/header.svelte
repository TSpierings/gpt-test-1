<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from './directives/click-outside';
  import { signOut } from '@auth/sveltekit/client';

	let expanded = false;

  const toggleMenu = (open: boolean) => {
    expanded = open;
  };
</script>

<header>
	<a href="/"><img src="/logo.png" alt="logo" /></a>

	<div id="user-menu" on:click={() => toggleMenu(!expanded)} on:keypress={() => toggleMenu(!expanded)}>
		{#if $page.data.session}
			<span>{$page.data.session.user?.name}</span>
			<img src={$page.data.session.user?.image} alt="User avatar" />

			{#if expanded}
				<div id="user-menu-options" use:clickOutside={() => toggleMenu(false)}>
					<a href="/" on:click={signOut}>Sign out</a>
				</div>
			{/if}
		{:else}
			<a href="/auth/login">Sign in</a>
		{/if}
	</div>
</header>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5em 1em 0.5em 2em;
		background-color: $shade-7;
		box-shadow: 0px 0.1em 0.1em rgba(0, 0, 0, 0.1);
		margin-bottom: 0.1em;

		a {
			flex: 1;
			color: black;
			text-decoration: none;
			font-weight: bold;

			&:hover {
				color: $highlight;
			}
		}

		#user-menu {
			display: flex;
			align-items: center;
			cursor: pointer;
			position: relative;

			img {
				margin-left: 1em;
				height: 2em;
				border-radius: 50%;
			}
		}

		#user-menu-options {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			position: absolute;
			top: 100%;
			right: 0;
			background-color: $shade-7;
			border: 1px solid $shade-5;
			margin-top: 0.5em;
			padding: 0.5em;
			border-radius: 1em;
			box-shadow: 0px 0.1em 0.1em rgba(0, 0, 0, 0.1);

			a {
				padding: 0 0.5em;
			}
		}
	}
</style>
