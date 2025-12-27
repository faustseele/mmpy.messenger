import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [],
  server: { port: 3000 },
  preview: { port: 3000 },
  build: { target: "es2022", outDir: "dist" },
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
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
