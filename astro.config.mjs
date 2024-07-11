import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import vercel from '@astrojs/vercel/serverless';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.SITE,
  integrations: [tailwind(), mdx(), sitemap(), icon(), vue()],
  output: "hybrid",
  adapter: vercel({
    isr: {
      // cache for 1 hour
      expiration: 60 * 60
    }
  })
});