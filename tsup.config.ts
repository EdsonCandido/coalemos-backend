import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/app.ts'],
  outDir: 'build',
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs'],
  target: 'node18',
  platform: 'node',
});