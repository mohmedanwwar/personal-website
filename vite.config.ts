import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is served from https://mohmedanwwar.github.io/personal-website/
// If you move to a custom domain, change base to "/".
export default defineConfig({
  plugins: [react()],
  base: "/personal-website/",
});
