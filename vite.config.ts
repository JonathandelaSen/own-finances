import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@modules": resolve(__dirname, "src/modules"),
      "@sections": resolve(__dirname, "src/sections"),
    },
  },
});
