import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node"; // Importante para SSR

export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
