import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'car-game.js',
        chunkFileNames: 'car-game-[name].js',
        assetFileNames: (assetInfo) => /\.css$/.test(assetInfo.name || '') ? 'car-game.css' : 'car-game-[name].[ext]',
      },
    },
    cssCodeSplit: true,
  },
});
