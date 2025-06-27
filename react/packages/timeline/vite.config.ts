import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf', '**/*.eot'],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'TristanUITimeline',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'index.esm.js' : 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@tristan-ui/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tristan-ui/core': 'TristanUICore'
        },
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').at(1);
          if (/woff2?|ttf|eot/.test(extType ?? '')) {
            return `fonts/[name].[ext]`;
          }
          if (/css/.test(extType ?? '')) {
            return `tristan-ui-timeline.[ext]`;
          }
          return `assets/[name].[ext]`;
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true
  }
}); 