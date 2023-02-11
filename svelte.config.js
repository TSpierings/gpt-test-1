import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
      "functions": {
        "routes/[slug].ts": {
          "maxDuration": 50
        },
        "routes/[slug].server.ts": {
          "maxDuration": 50
        },
        "routes/*.ts": {
          "maxDuration": 50
        },
        "routes/**/*.ts": {
          "maxDuration": 50
        },
      }
    })
	}
};

export default config;
