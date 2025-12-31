import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    svelte(),
    checker({ typescript: true })
  ],
  base: '/foodict-page/',
  server: {
    host: true
  }
})
