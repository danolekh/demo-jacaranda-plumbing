// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://jacaranda-plumbing.danolekh.com",
  trailingSlash: "ignore",
  build: {
    // One HTML request paints the first screen: no render-blocking stylesheet on a slow phone.
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
