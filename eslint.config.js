'use strict';

const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tailwindcss = require('tailwindcss/plugin');

const globals = require('globals');
const typescriptEslintParser = require('@typescript-eslint/parser');

const eslintJs = require('@eslint/js');
const pluginImport = require('eslint-plugin-import');
const pluginJsxA11y = require('eslint-plugin-jsx-a11y');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginTestingLibrary = require('eslint-plugin-testing-library');
const pluginTailwindcss = require('eslint-plugin-tailwindcss');
const pluginStorybook = require('eslint-plugin-storybook');

const tsConfig = require('./tsconfig.json');

// Import tailwind configs instead of simply specifying the config path because editors do not correctly load these
// configurations otherwise (see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/51)
const tailwindConfig = require('./tailwind.config');

const extendsBase = [
    eslintJs.configs.recommended,
    { rules: pluginImport.configs.recommended.rules },
    { rules: pluginImport.configs.typescript.rules },
    // pluginJsxA11y.configs.recommended,
    { rules: pluginReact.configs.recommended.rules },
    { rules: pluginReact.configs['jsx-runtime'].rules },
    // pluginReactHooks.configs.recommended,
    // pluginTestingLibrary.configs.react,
    // pluginTailwindcss.configs.recommended,
    // pluginStorybook.configs.recommended,
];

const extendsTypescript = [...extendsBase, typescriptEslint.configs.recommended];

const rulesBase = {
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/self-closing-comp': 'warn',
    'react/prop-types': 'off',
    'react/jsx-boolean-value': ['warn', 'always'],
    'no-console': 'warn',
    curly: 'warn',
    'brace-style': 'warn',
    'prefer-template': 'warn',
    'no-useless-concat': 'warn',
    'import/no-cycle': 'warn',
};

const typescriptRules = {
    ...rulesBase,
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
    '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
};

/** @type {(import('eslint').Linter.FlatConfig)[]} */
module.exports = [
    ...extendsBase,
    {
        plugins: {
            import: pluginImport,
            react: pluginReact,
            typescriptEslint,
        },
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                // ...globals.node,
                // ...globals.jest,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            tailwindcss: {
                callees: ['classnames', 'classNames', 'clsx', 'ctl'],
                config: tailwindConfig,
            },
        },
        rules: rulesBase,
        ignores: tsConfig.exclude,
    },
    // {
    //     ...extendsTypescript,
    //     files: ['**/*.ts', '**/*.tsx'],
    //     rules: typescriptRules,
    // },
];
