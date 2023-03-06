<script lang="ts">
	import Dropdown from '$lib/components/generic/dropdown.svelte';
	import Panel from '$lib/components/generic/panel.svelte';
	import { UserRole, type User } from '$lib/models/user';
	import type { PageData } from './$types';

	export let data: PageData;

	const { users } = data;

	let selectedUser: User;
	const roles = [UserRole.admin, UserRole.editor, UserRole.default];
</script>

<div class="container">
	<Panel title="Users">
		<div class="items">
			{#each users as user}
				<button
					on:click={() => (selectedUser = user)}
					class={`${user.email === selectedUser?.email ? 'selected' : ''}`}
				>
					{user.email}
				</button>
			{/each}
		</div>
	</Panel>

	<Panel title="Editor">
		{#if selectedUser}
			<form method="post" action="?/update" class="editor" autocomplete="off">
				<img src={selectedUser.image} alt="profile" />
				<div>
					<input class="hidden" name="email" value={selectedUser.email} />
					<input class="hidden" name="role" value={selectedUser.role} />
					<span>{selectedUser.name}</span>
					<span>{selectedUser.email}</span>
					<div class="roles">
						{#each roles as role}
							<button
								type="submit"
								class={`${role === selectedUser.role ? 'selected' : ''}`}
								on:click={() => (selectedUser.role = role)}>{role}</button
							>
						{/each}
					</div>
				</div>
			</form>
		{/if}
	</Panel>
</div>

<style lang="scss">
	@use '/src/lib/colors.scss' as *;

	.container {
		display: grid;
		grid-template-columns: 1fr 2fr;
		flex: 1;
		gap: 1rem;
		overflow: hidden;

		@media (max-width: 768px) {
			margin: 0.5rem;
			grid-template-columns: 1fr;
			overflow-y: visible;
		}

		.items {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			button {
				display: flex;
				padding: 0.5rem 1rem;
				background-color: $shade-6;
				border-radius: 4px;
				font-family: 'proximanova-bold', 'proximanova-regular', sans-serif;

				&.new {
					background-color: transparent;
					border: 1px dashed black;
				}

				&:hover {
					background-color: $shade-5;
				}

				&.selected {
					background-color: $shade-5;
				}
			}
		}

		.editor {
			display: flex;
			gap: 1rem;

			div {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			img {
				max-width: 6rem;
				max-height: 6rem;
			}

			.roles {
				display: flex;
				flex-direction: row;

				button {
					background-color: $shade-6;
					border-radius: 1rem;
					padding: 0.5rem;
					font-family: 'proximanova-bold', 'proximanova-regular', sans-serif;

					&:hover {
						background-color: $shade-5;
					}

					&.selected {
						background-color: $highlight;
						color: white;
					}
				}
			}
		}
	}
</style>
