import type { Meta, StoryObj } from '@storybook/react';
import { LinkBase } from './linkBase';

const meta: Meta<typeof LinkBase> = {
    title: 'Core/Components/Link/LinkBase',
    component: LinkBase,
};

type Story = StoryObj<typeof LinkBase>;

/**
 * LinkBase is a basic component that renders a link based on the component set in the OdsCoreModules context.
 * It must be used in all ODS components whenever a link needs to be rendered.
 */
export const Default: Story = {
    args: {
        children: 'Link base',
        href: 'https://aragon.org',
        target: '_blank',
    },
};

export default meta;
