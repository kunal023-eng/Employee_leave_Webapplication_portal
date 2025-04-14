import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,          // Ensures Vite listens on all network interfaces
    port: 3002,          // Changed port to 5173
    strictPort: true     // Ensures Vite fails if port is unavailable
  }
})
