import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["lib/main.tsx"],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace("/lib", ""),
        content,
      }),
    }),
  ],
  build: {
    lib: {
      entry: "lib/main.tsx",
      name: "ReactFeatureFlag",
      fileName: (format) => `react-masonify.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
    },
  },
}));
