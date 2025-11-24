import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "node:path";

const backServer = `http://localhost:3000`;
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 개발용 임시 서버
  server: {
    // Vue.js 실행 시 적용 PORT 변경
    port: 8099,
    //SAME ORIGIN POLICY의 예외 상황을 두는법 >>>>>> CORS(Cross Origin Resource Sharing) => proxy setting
    // 서버에 vue에 대해 CORS를 등록해버리면 운영모드를 할 때 그 설정이 의미가 없음.
    // 그러므로 proxy라는 설정을 통해 임시적으로 CORS라는 설정을 무력화 시키는것.
    proxy: {
      "^/api": {
        target: backServer,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    // outDir :  '../backend/public'
  },
});
