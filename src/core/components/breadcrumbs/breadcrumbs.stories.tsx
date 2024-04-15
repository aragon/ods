import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    title: 'Core/Components/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=15704%3A53630&mode=design&t=wK3Bn7hqwwBM55IZ-1',
        },
    },
};

type Story = StoryObj<typeof Breadcrumbs>;

/**
 * Default usage example of the Breadcrumb component.
 */
export const Default: Story = {
    args: {
        currentPage: 'You are here',
        breadcrumbOrder: [{ label: 'Root', href: '/' }],
    },
};

/**
 * Usage example of the Breadcrumb component with full props.
 */
export const Loaded: Story = {
    args: {
        currentPage: 'You are here',
        breadcrumbOrder: [
            { label: 'Root', href: '/' },
            { label: 'Page', href: '/page' },
            { label: 'Subpage', href: '/page/subpage' },
        ],
        tag: { label: 'Tag', variant: 'info' },
    },
};

export default meta;
