import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import {vitePluginGraphqlLoader} from "vite-plugin-graphql-loader";

// https://vitejs.dev/config/
export default defineConfig({
    root: './front',
    plugins: [
        vue(),
        VueI18nPlugin({
            runtimeOnly: false,
            strictMessage: false,
            include: resolve(dirname(fileURLToPath(import.meta.url)), './front/i18n/**'),
        }),
        vitePluginGraphqlLoader()
    ],
    server: {
        host: "0.0.0.0",
        port: 3000
    },
    build: {
        outDir: '../dist/public',
        target: 'esnext'
    },
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./front', import.meta.url)) }
        ],
    }
})
