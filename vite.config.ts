import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://akash-verma-au16.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
