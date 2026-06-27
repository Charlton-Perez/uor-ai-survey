import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In CI the deploy workflow sets VITE_REPO_NAME to the GitHub repo name.
// Locally it's unset so dev server works at /.
const base = process.env.VITE_REPO_NAME ? `/${process.env.VITE_REPO_NAME}/` : '/'

export default defineConfig({
  plugins: [react()],
  base,
  build: { chunkSizeWarningLimit: 1000 },
})
