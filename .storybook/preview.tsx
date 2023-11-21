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
        options: {
            storySort: {
                method: 'alphabetical',
                order: ['Docs', ['Documentation', 'Installation', 'Changelog'], 'Design Tokens', 'Components'],
            },
        },
        backgrounds: {
            default: 'neutral-50',
            values: [
                {
                    name: 'neutral-0',
                    value: 'var(--ods-color-neutral-0)',
                },
                {
                    name: 'neutral-50',
                    value: 'var(--ods-color-neutral-50)',
                },
                {
                    name: 'neutral-800',
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
