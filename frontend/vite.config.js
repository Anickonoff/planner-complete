import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.2.226:3000",
        changeOrigin: true, // Прокси для API запросов к бэкенду
      },
    },
  },
  plugins: [react()],
});
