import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteVConsole } from "vite-plugin-vconsole";
import { prismjsPlugin } from "vite-plugin-prismjs";
import * as path from "path";
import * as fs from "fs";

interface IAppEnv {
    readonly X5PLAN_CDN_URL: string;
    readonly X5PLAN_ICON_URL: string;
    readonly X5PLAN_API_URL: string;
    readonly X5PLAN_DEV_API_URL: string;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const appEnv = loadEnv(mode, process.cwd(), "X5PLAN_") as unknown as IAppEnv;

    return {
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
            viteVConsole({
                enabled: mode !== "production",
                entry: path.resolve("src/main.tsx"),
                config: {
                    maxLogNumber: 1000,
                },
            }),
            prismjsPlugin({
                languages: fs
                    .readFileSync(path.resolve(".prism-languages"), "utf-8")
                    .trim()
                    .split("\n"),
                css: false,
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
            },
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
    };
});
