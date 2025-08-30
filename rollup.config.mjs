import { defineConfig } from 'rollup'
// Usamos esbuild para transpilación rápida; las declaraciones se generan con tsc separado
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
  file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    esbuild({
      include: 'src/**/*.(ts|tsx)',
      minify: false,
      target: 'es2019',
      tsconfig: 'tsconfig.lib.json',
      loaders: { '.tsx': 'tsx' },
    }),
    nodeResolve({ browser: true }),
    commonjs(),
    postcss({ extract: true, minimize: true }),
  ],
  external: [
    'react',
    'react-dom',
    '@tanstack/react-table',
    'lucide-react',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  'zod',
  'recharts'
  ],
})
