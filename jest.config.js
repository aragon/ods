'use strict';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: ['.d.ts', '.api.ts', 'index.ts', '.stories.tsx', './src/test/*'],
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    transform: {
        '^.+\\.svg$': '<rootDir>/src/test/svgTransform.js',
        '^.+\\.m?[tj]sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|react-merge-refs))'],
};

module.exports = config;
