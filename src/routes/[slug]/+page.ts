import { Flows } from './../../lib/flows';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (({ params }) => {
  const flow = Flows.find(flow => flow.title === params.slug);

  if (!flow) {
    throw error(404, 'No flow found for given route');
  }

  return {
    flow: flow,
  }
}) satisfies PageLoad;