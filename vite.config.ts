import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        createHtmlPlugin({
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "[name].[hash].js",
                chunkFileNames: "scripts/[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]",
            },
        }
    },
});
