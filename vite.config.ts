// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/?(*.)test.ts?(x)'],
    coverage: {
      exclude: [...configDefaults.exclude, 'src/main.tsx', 'src/vite-env.d.ts', 'src/@types', 'src/context/**', 'src/util/config.ts', 'src/**/index.ts'],
      reportsDirectory: './test_coverage',
      reporter: [
        ['lcov', { 'projectRoot': './src' }],
        ['text']
      ]
    }
  },
})
