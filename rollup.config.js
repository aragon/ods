import commonjs from '@rollup/plugin-commonjs';
import images from '@rollup/plugin-image';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import tsConfig from './tsconfig.json' assert { type: "json" };
const { outDir } = tsConfig.compilerOptions;

export default [
    {
        input: {
            index: 'src/index.ts',
        },
        output: [
            { format: 'es', dir: outDir, entryFileNames: '[name].[format].js' },
            { format: 'cjs', dir: outDir, entryFileNames: '[name].[format].js' },
        ],
        plugins: [
            cleanup({ targets: `${outDir}/*` }),
            peerDepsExternal(),
            nodeResolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json', sourceMap: true }),
            postcss({
                config: {
                    path: './postcss.config.js',
                },
                extensions: ['.css'],
                minimize: true,
                inject: {
                    insertAt: 'top',
                },
            }),
            images({ include: ['**/*.png', '**/*.jpg', '**/*.svg'] }),
            terser(),
        ],
    },
    {
        input: 'dist/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
    },
];
