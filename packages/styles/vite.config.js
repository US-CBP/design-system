// vite.config.js
import { resolve } from 'path'
import { defineConfig, normalizePath } from 'vite'

export default defineConfig({
  server: {
    port: 8000,
  },
  preview: {
    port: 8080,
  },
  plugins: [],
  build: {
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.js'),
      name: 'bundle',
      // the proper extensions will be added
      fileName: 'bundle',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
})