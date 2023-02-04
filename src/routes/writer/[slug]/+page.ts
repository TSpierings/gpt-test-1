import type { PageLoad } from './$types';

export const load = (({ params }) => {
  return {
    title: params.slug
  }
}) satisfies PageLoad;