import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  server: { port: 3000 },
  preview: { port: 3000 },
  build: { outDir: "dist" },
  css: {
    modules: {
      scopeBehaviour: "local",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    postcss: "./postcss.config.js",
  },
  resolve: {
    /* The resolve.extensions option tells Vite
      which file extensions to try when resolving imports.
      Including .ts and .d.ts ensures Vite can handle
      TypeScript files with explicit extensions */
    extensions: [".js", ".ts", ".d.ts"],
  },
});
