'use strict';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: ['.d.ts', '.api.ts', 'index.ts', '.stories.tsx'],
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    transform: { '^.+\\.tsx?$': 'ts-jest' },
};

module.exports = config;
