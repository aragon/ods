import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
    title: 'components/Spinner',
    component: Spinner,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Spinner>;

/**
 * Default usage example of the Spinner component.
 */
export const Default: Story = {
    args: {
        variant: 'neutral',
        size: 'lg',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=7806-26769&mode=dev',
        },
    },
};

export default meta;
