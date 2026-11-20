import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Default base "/" suits standalone hosting or moving this folder to its own repo.
// If deploying under a GitHub Pages subpath, set base accordingly.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
