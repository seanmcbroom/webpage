import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import {
  Vuetify3Resolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver,
} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";

import { routes } from "./src/router/routes.js";
import { getBlogRoutes } from "./scripts/getBlogRoutes.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: false,
      forceStringify: true,
      include: resolve("locales/**"),
    }),
    tailwindcss(),
    // This plugin allows to autoimport Vue components
    Components({
      dts: "./types/components.d.ts",
      resolvers: [
        Vuetify3Resolver(),
        VueUseComponentsResolver(),
        VueUseDirectiveResolver(),
      ],
    }),
    Sitemap({
      hostname: "https://seanmcbroom.com",
      dynamicRoutes: [...routes.map((r) => r.path), ...getBlogRoutes()],
      readable: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  server: {
    proxy: {
      "^/api": {
        target: "http://localhost:5055",
        changeOrigin: false,
        secure: false,
      },
    },
  },
});
