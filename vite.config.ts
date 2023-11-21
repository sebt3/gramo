import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {vitePluginGraphqlLoader} from "vite-plugin-graphql-loader";

// https://vitejs.dev/config/
export default defineConfig({
    root: './front',
    plugins: [vue(),vitePluginGraphqlLoader()],
    server: {
        host: "0.0.0.0",
        port: 3000
    },
    build: {
        outDir: '../dist/public'
    }
})
