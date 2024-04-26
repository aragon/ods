import type { Meta, StoryObj } from '@storybook/react';
import { LinkBase } from './linkBase';

const meta: Meta<typeof LinkBase> = {
    title: 'Core/Components/Link/LinkBase',
    component: LinkBase,
    tags: ['autodocs'],
    argTypes: {
        href: { control: 'text' },
    },
    parameters: {
        docs: {
            description: {
                component: 'TODO',
            },
        },
    },
};

type Story = StoryObj<typeof LinkBase>;

export const Default: Story = {
    args: {
        children: 'Label',
        href: 'https://aragon.org',
        target: '_blank',
    },
};

export default meta;
