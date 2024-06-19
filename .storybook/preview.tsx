import type { Preview } from '@storybook/react';
import '../index.css';
import { OdsModulesProvider } from '../src/modules';
import './style.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                method: 'alphabetical',
                order: [
                    'Docs',
                    ['Documentation', 'Installation', 'Changelog'],
                    'Theme',
                    ['Documentation'],
                    'Core',
                    ['Documentation'],
                    'Modules',
                    ['Documentation'],
                ],
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
            <OdsModulesProvider>
                <div className="flex">
                    <Story />
                </div>
            </OdsModulesProvider>
        ),
    ],

    tags: ['autodocs']
};

export default preview;
