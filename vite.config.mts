import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { createHtmlPlugin } from "vite-plugin-html";

interface IAppEnv {
    readonly X5PLAN_CDN_URL: string;
    readonly X5PLAN_ICON_URL: string;
    readonly X5PLAN_API_URL: string;
    readonly X5PLAN_DEV_API_URL: string;
}

const appEnv = loadEnv("", process.cwd(), "X5PLAN_") as unknown as IAppEnv;

// https://vitejs.dev/config/
export default defineConfig({
    envPrefix: "X5PLAN_",
    base: appEnv.X5PLAN_CDN_URL,
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
    server: {
        host: "0.0.0.0",
        port: 5055,
        strictPort: true,
        proxy: {
            "/api": {
                target: appEnv.X5PLAN_DEV_API_URL,
                changeOrigin: true,
            },
        }
    },
    preview: {
        port: 5056,
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "scripts/[name].[hash].js",
                chunkFileNames: "scripts/[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]",
            },
        },
    },
});
