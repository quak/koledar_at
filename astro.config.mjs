import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

//hmm wehy

// https://astro.build/config
export default defineConfig({
  site: 'https://www.koledar.at',
  output: 'server',
  server: {
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
  },
  integrations: [react(), tailwind({
    applyBaseStyles: false
  })],
  adapter: vercel()
});


