import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// ...

export default defineConfig({
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@compo': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
  plugins: [vue()],
})
