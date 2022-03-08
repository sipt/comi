import { fileURLToPath, URL } from "url";

import { defineConfig, type Alias } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

const prefix = "monaco-editor/esm/vs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      {
        find: /^vs\/css!(.*)$/,
        replacement: "./$1.css",
      },
      { find: "vs/base", replacement: fileURLToPath(new URL("./src/vs/base", import.meta.url)) },
      { find: "vs/platform", replacement: fileURLToPath(new URL("./src/vs/platform", import.meta.url)) },
      { find: "vs/nls", replacement: fileURLToPath(new URL("./src/vs/nls.mock.ts", import.meta.url)) },
    ] as Alias[],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
        },
      },
    },
  },
});
