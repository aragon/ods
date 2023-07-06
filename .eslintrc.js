'use strict';

const tsConfig = require('./tsconfig.json');
const tailwindConfig = require('./tailwind.config');

const extendsBase = [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
];

const extendsTypescript = [...extendsBase, 'plugin:@typescript-eslint/recommended'];

const rulesBase = {
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/self-closing-comp': 'warn',
    'no-console': 'warn',
    curly: 'warn',
    'brace-style': 'warn',
    'prefer-template': 'warn',
    'no-useless-concat': 'warn',
};

const typescriptRules = {
    ...rulesBase,
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
    '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
};

module.exports = {
    env: {
        commonjs: true,
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
        tailwindcss: {
            callees: ['classnames', 'clsx', 'ctl', 'twMerge'],
            config: tailwindConfig,
        },
    },
    extends: extendsBase,
    plugins: ['@typescript-eslint', 'tailwindcss'],
    rules: rulesBase,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    ignorePatterns: tsConfig.exclude,
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: extendsTypescript,
            rules: typescriptRules,
        },
    ],
};
