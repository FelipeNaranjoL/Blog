/**
 * ==========================================================
 * Archivo: vite.config.ts
 * Descripción: Configuración principal de Vite para el blog.
 * Integra React y TailwindCSS como plugins.
 * ==========================================================
 */

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // Plugin oficial de Tailwind para Vite
import react from '@vitejs/plugin-react'   // Plugin oficial de React para Vite

// Exporta la configuración principal de Vite
export default defineConfig({
  plugins: [
    react(),       // Habilita soporte para React (JSX/TSX, Fast Refresh, etc.)
    tailwindcss(), // Habilita integración de TailwindCSS con Vite
  ],
})
