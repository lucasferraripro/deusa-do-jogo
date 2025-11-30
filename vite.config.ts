import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo atual (development/production)
  // O terceiro argumento '' garante que carregue todas as variáveis, não apenas as com prefixo VITE_
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // Injeta a API Key no código client-side de forma segura.
      // Se a variável não existir no momento do build, usa uma string vazia para não quebrar a compilação.
      // A chave real será lida do ambiente do Vercel quando o app rodar.
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY || '')
    }
  };
});