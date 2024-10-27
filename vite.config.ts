import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["lib/**/*.{ts,tsx}"],
      exclude: ["lib/**/*.test.ts", "lib/**/*.test.tsx"],
      outDir: "dist",
      rollupTypes: true,
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, "./tsconfig.json"),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.tsx"),
      formats: ["es", "umd", "cjs"],
      name: "ReactMasonify",
      fileName: (format) => {
        switch (format) {
          case "es":
            return "react-masonify.es.js";
          case "umd":
            return "react-masonify.umd.js";
          case "cjs":
            return "react-masonify.cjs.js";
          default:
            return "react-masonify.js";
        }
      },
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    minify: "esbuild",
    cssMinify: true,
    outDir: "dist",
    emptyOutDir: true,
  },
});
