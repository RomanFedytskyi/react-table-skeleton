import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['react-table-skeleton']
  }
});
