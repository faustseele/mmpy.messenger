import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  server: { port: 3000 },
  build: { outDir: "build" },
  css: {
    modules: {
      scopeBehaviour: "local",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    postcss: "./postcss.config.js",
  },
});
