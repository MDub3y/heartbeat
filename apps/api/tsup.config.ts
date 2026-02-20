import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  noExternal: ['store', /^\./],
  external: ['@prisma/client', 'prisma'],
  outDir: 'dist',
});