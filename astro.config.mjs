// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // Do not assetsInclude .glb — public/robot.glb is served as-is from /public.
    // Including it made Vite read the 19MB file during dev and froze the server.
    server: {
      watch: {
        ignored: ['**/public/robot.glb', '**/*.glb', '**/*.gltf'],
      },
    },
  },
});
