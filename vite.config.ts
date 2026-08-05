import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


import fs from 'fs'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function tfjsTfliteFixer() {
  return {
    name: 'tfjs-tflite-fixer',
    configResolved() {
      const wasmDir = path.resolve(__dirname, 'node_modules/@tensorflow/tfjs-tflite/wasm')
      const distPath = path.resolve(
        __dirname,
        'node_modules/@tensorflow/tfjs-tflite/dist/tflite_web_api_client.js'
      )
      const publicWasmDir = path.resolve(__dirname, 'public/wasm')

      try {
        // Copy tflite_web_api_client.js to dist if missing
        const srcClient = path.join(wasmDir, 'tflite_web_api_client.js')
        if (fs.existsSync(srcClient) && !fs.existsSync(distPath)) {
          fs.copyFileSync(srcClient, distPath)
        }

        // Ensure public/wasm directory exists and copy all WASM/JS assets
        if (fs.existsSync(wasmDir)) {
          if (!fs.existsSync(publicWasmDir)) {
            fs.mkdirSync(publicWasmDir, { recursive: true })
          }
          const files = fs.readdirSync(wasmDir)
          for (const file of files) {
            const src = path.join(wasmDir, file)
            const dest = path.join(publicWasmDir, file)
            if (fs.statSync(src).isFile() && !fs.existsSync(dest)) {
              fs.copyFileSync(src, dest)
            }
          }
        }
      } catch {
        // ignore if permissions or missing
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    tfjsTfliteFixer(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['@tensorflow/tfjs-tflite'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    proxy: {
      // AI chat requests → Express backend (port 5000)
      '/api/chat': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // Authentication requests → Django backend (port 8000)
      '/api/auth': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
