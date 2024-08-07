import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/sheets-api": {
        target:
          "https://script.google.com/macros/s/AKfycbwzT5qGLyAogkPNuT_xOqWFF95op78Nt2bkLlrhIAyu7qGJAE39FnHNgd_xjycmPJll/exec",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sheets-api/, ""),
      },
    },
  },
});
