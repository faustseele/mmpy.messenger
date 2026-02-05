import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: VitePWA({
    registerType: "autoUpdate",
    devOptions: { enabled: true },
    includeAssets: ["static/*.ico", "static/*.png", "static/*.svg"],
    manifest: {
      name: "MMPY Messenger",
      short_name: "MMPY-Msgr",
      description: "mmpy.messenger 💌 — portfolio pet-project",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/static/logo.ico",
          sizes: "any",
          type: "image/x-icon",
        },
        {
          src: "/static/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/static/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  }),
});
