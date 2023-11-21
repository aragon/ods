const commonjs = require('@rollup/plugin-commonjs');
const images = require('@rollup/plugin-image');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const { visualizer } = require('rollup-plugin-visualizer');
const svgr = require('@svgr/rollup');
const postcss = require('rollup-plugin-postcss');

const tsConfig = require('./tsconfig.json');
const { outDir } = tsConfig.compilerOptions;

const package = require('./package.json');
const analyze = process.env.ANALYZE === 'true';

module.exports = [
    {
        input: {
            index: 'src/index.ts',
        },
        output: [
            {
                format: 'es',
                dir: outDir,
                entryFileNames: '[name].[format].js',
                sourcemap: true,
                interop: 'auto',
                plugins: [analyze ? visualizer({ filename: 'stats.es.html', open: true }) : undefined],
            },
            {
                format: 'cjs',
                dir: outDir,
                entryFileNames: '[name].[format].js',
                sourcemap: true,
                interop: 'auto',
                plugins: [analyze ? visualizer({ filename: 'stats.cjs.html', open: true }) : undefined],
            },
        ],
        external: Object.keys(package.dependencies),
        plugins: [
            // Locate and resolve node modules
            nodeResolve(),

            // Convert CommonJs modules to ES6
            commonjs(),

            // Compile ts files and generate type declarations
            typescript({
                compilerOptions: {
                    noEmit: false,
                    declaration: true,
                    declarationDir: `${outDir}/types`,
                    outDir,
                },
                exclude: ['**/*.spec.tsx', '**/*.spec.ts', '**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
            }),

            // Bundle png and jpg images
            images({ include: ['**/*.png', '**/*.jpg'] }),

            // Bundle svg files
            svgr(),

            // Generate a minified bundle
            terser(),
        ],
    },
    {
        input: 'index.css',
        output: { file: 'build.css' },
        plugins: [postcss({ plugins: [], extract: true, minimize: true })],
    },
];
