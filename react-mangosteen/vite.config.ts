import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgsprites } from './vite_plugins/svgsprites';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    svgsprites({ noOptimizeList: ['chart', 'category', 'export', 'noty', 'logo', 'calendar', 'add'] })
  ],
})
