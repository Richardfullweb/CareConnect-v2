import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Diretório de saída do build
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: './', // Define um caminho base relativo para assets
});
