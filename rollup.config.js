import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

export default defineConfig({
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      jsx: 'react',
      exclude: [
        'app/**/*',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.stories.ts',
        '**/*.stories.tsx',
      ],
    }),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
  external: [
    'react',
    'react-dom',
    '@tanstack/react-table',
    'lucide-react',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
})
