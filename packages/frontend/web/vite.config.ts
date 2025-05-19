import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { FRONTEND_PORT } = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: +FRONTEND_PORT,
      allowedHosts: ['host.docker.internal'],
    },
    build: {
      sourcemap: true,
    },
  };
});
