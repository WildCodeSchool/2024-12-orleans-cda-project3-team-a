import path from 'path';
import { defineProject } from 'vitest/config';

export default defineProject({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
  },
});
