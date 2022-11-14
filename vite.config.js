import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: "src",
    resolve: {
        alias: {
            '/@modules/': `${resolve(__dirname, './node_modules')}/`
        }
    },
    build: {
        outDir: `${resolve(__dirname, 'dist')}/`,
    },
    preview :{
        port: 80
    },
    server: {
        port: 80
    }
})