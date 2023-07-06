'use strict';

const tsConfig = require('./tsconfig.json');

module.exports = {
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:tailwindcss/recommended',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
        '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
        'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
        'import/no-duplicates': 'warn',
        'no-console': 'warn',
        curly: 'warn',
        'brace-style': 'warn',
        'react/self-closing-comp': 'warn',
        'prefer-template': 'warn',
        'no-useless-concat': 'warn',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: tsConfig.exclude,
};
