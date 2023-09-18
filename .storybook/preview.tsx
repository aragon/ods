import type { Preview } from '@storybook/react';
import '../index.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: 'var(--ods-color-neutral-50)',
                },
                {
                    name: 'dark',
                    value: 'var(--ods-color-neutral-800)',
                },
            ],
        },
    },
    decorators: [
        (Story) => (
            <div className="flex">
                <Story />
            </div>
        ),
    ],
};

export default preview;
