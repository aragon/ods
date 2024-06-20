import type { StorybookConfig } from '@storybook/react-webpack5';
import type { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
    stories: ['../docs/**/*.@(md|mdx)', '../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.@(md|mdx)'],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        { name: '@storybook/addon-styling', options: { postCss: true } },
        '@storybook/addon-designs',
        '@storybook/addon-mdx-gfm',
        '@storybook/addon-webpack5-compiler-babel',
        '@chromatic-com/storybook',
    ],

    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },

    webpackFinal: (webpackConfig) => {
        // Remove any svg loader already set and use @svgr/webpack to load svgs on Storybook
        const svgWebpackRule = webpackConfig.module?.rules?.find((rule) => {
            if (rule != null && typeof rule !== 'string' && (rule as RuleSetRule)?.test instanceof RegExp) {
                return (rule as Record<string, any>).test?.test('.svg');
            }
        });

        if (typeof svgWebpackRule !== 'string') {
            (svgWebpackRule as RuleSetRule).exclude = /\.svg$/;
        }

        webpackConfig.module?.rules?.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return webpackConfig;
    },

    docs: {},
};

export default config;
