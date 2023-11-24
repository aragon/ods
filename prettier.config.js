'use strict';

/** @type {import('prettier').Config} */
module.exports = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    overrides: [
        {
            files: '*.{json,json5,css,scss,yml}',
            options: {
                tabWidth: 2,
                singleQuote: false,
            },
        },
        {
            files: '*.{json,json5}',
            options: {
                printWidth: 999999,
            },
        },
        {
            files: '*.{md,mdx}',
            options: {
                proseWrap: 'always',
            },
        },
    ],
    plugins: [require.resolve('prettier-plugin-organize-imports'), 'prettier-plugin-tailwindcss'],
};
