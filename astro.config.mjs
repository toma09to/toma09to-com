import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: node({
    mode: "standalone"
  }),

  site: 'https://toma09to.com',
  integrations: [sitemap()]
});
