import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Modules/Components/Breadcrumb/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=14385%3A24287&mode=dev&t=IX3Fa96hiwUEtcoA-1',
        },
    },
};

type Story = StoryObj<typeof Breadcrumb>;

/**
 * Default usage example of the Breadcrumb component.
 */
export const Default: Story = {
    args: {
        currentPage: 'You are here',
        pathOrder: [{ label: 'Root', href: '/' }],
    },
};

/**
 * Usage example of the Breadcrumb component with full props.
 */
export const Loaded: Story = {
    args: {
        currentPage: 'You are here',
        pathOrder: [
            { label: 'Root', href: '/' },
            { label: 'Page', href: '/page' },
            { label: 'Subpage', href: '/page/subpage' },
        ],
        tag: { label: 'Tag', variant: 'info' },
    },
};

export default meta;
