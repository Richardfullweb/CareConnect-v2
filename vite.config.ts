import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Define o diretório de saída do build
    emptyOutDir: true, // Limpa o diretório antes de um novo build
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclusão específica que você configurou
  },
  resolve: {
    alias: {
      '@': '/src', // Atalho para o diretório "src"
    },
  },
  server: {
    port: 3000, // Configuração opcional do servidor local
  },
  base: './', // Define um caminho base relativo para suportar Vercel
});
