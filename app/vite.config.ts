import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'library') {
    // Library build configuration
    return {
      plugins: [react()],
      css: {
        modules: {
          localsConvention: 'camelCase',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      },
      build: {
        lib: {
          entry: './src/index.ts',
          name: 'Tristan',
          formats: ['es', 'umd'],
          fileName: (format) => format === 'es' ? 'index.esm.js' : 'index.js',
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        sourcemap: true,
        minify: 'esbuild',
        cssCodeSplit: false,
        outDir: 'dist',
        emptyOutDir: true,
      }
    }
  }
  
  // Development configuration
  return {
    plugins: [react()]
  }
})
