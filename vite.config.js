import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "leaflet-html",
      fileName: "leaflet-html"
    },
    minify: "false"
  },
  test: {
    includeSource: ["src/**/*.{js,ts}"],
    coverage: {
      exclude: ["docs"]
    }
  },
});
