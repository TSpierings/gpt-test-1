import { users } from '$db/users';
import { UserRole } from '$lib/models/user';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const session = await locals.getSession();
  if (!session?.user) throw redirect(303, '/auth/login');

  const result = await users.findOne({ email: session?.user?.email ?? '' }, { projection: { _id: 0 } });

  if (!result?.role || ![UserRole.admin, UserRole.editor].includes(result.role)) throw redirect(303, '/');

  return {
    user: result
  };
}) satisfies LayoutServerLoad;