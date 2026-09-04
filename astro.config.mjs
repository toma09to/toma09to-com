// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://toma09to.com',
  redirects: {
    "/about/detail": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
});
