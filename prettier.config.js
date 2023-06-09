'use strict';

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
    ],
    plugins: [
        require.resolve('prettier-plugin-organize-imports'),
        // TODO: introduce tailwind prettier plugin after migration to Prettier v3 as not supported by V2
        // require('prettier-plugin-tailwindcss'),
    ],
    // TODO: introduce plugin options when prettier-plugin-tailwindcss is enabled
    // tailwindFunctions: ['twMerge'],
};
