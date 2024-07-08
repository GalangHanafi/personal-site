import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import vercel from '@astrojs/vercel/serverless';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: "https://astroship.web3templates.com",
  integrations: [tailwind(), mdx(), sitemap(), icon()],
  output: "hybrid",
  adapter: vercel({
    isr: {
      // cache for 1 hour
      expiration: 60 * 60,
    },
  })
});