<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from './directives/click-outside';
  import { signOut } from '@auth/sveltekit/client';
	import { UserRole } from './models/user';

	export let role: UserRole;

	let expanded = false;

  const toggleMenu = (open: boolean) => {
    expanded = open;
  };
</script>

<header>
	<a href="/"><img src="/logo.png" alt="logo" /></a>

	<div class="user-menu" on:click={() => toggleMenu(!expanded)} on:keypress={() => toggleMenu(!expanded)}>
		{#if $page.data.session}
			<span class="name">{$page.data.session.user?.name}</span>
			<img src={$page.data.session.user?.image} alt="User avatar" />

			{#if expanded}
				<div class="user-menu-options" use:clickOutside={() => toggleMenu(false)}>
          <a href="/speeches">My speeches</a>
					{#if [UserRole.admin, UserRole.editor].includes(role)}
						<a href="/admin">Admin panel</a>
					{/if}
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
    max-width: 100vw;
    /* overflow-x: hidden; */

    @media (max-width: 768px) {
      padding: 0.5rem;
		}

		a {
			flex: 1;
			color: black;
			text-decoration: none;
			font-weight: bold;

			&:hover {
				color: $highlight;
			}
		}

		.user-menu {
			display: flex;
			align-items: center;
			cursor: pointer;
			position: relative;

			img {
				margin-left: 1em;
				height: 2em;
				border-radius: 50%;
			}

      .name {
        @media (max-width: 768px) {
          display: none;
        }
      }
		}

		.user-menu-options {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			position: absolute;
			top: 100%;
			right: 0;
			background-color: $shade-7;
			border: 1px solid $shade-5;
			margin-top: 0.5em;
			border-radius: 4px;
			box-shadow: 0px 0.1em 0.1em rgba(0, 0, 0, 0.1);
      white-space: nowrap;

			a {
				padding: 0.5rem 1rem;
        border-bottom: 1px solid $shade-5;

        &:last-of-type {
          border: none;
        }
			}
		}
	}
</style>
