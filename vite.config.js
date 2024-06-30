import { defineConfig } from "vite";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: "chromium",
      provider: "playwright"
    },
    coverage: {
      provider: "istanbul"
    },
    includeSource: ["src/**/*.{js,ts}"],
  },
});
