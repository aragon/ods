import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Tooltip>;

/**
 * Default usage example of the `Tooltip` component.
 */
export const Default: Story = {
    args: {
        label: 'Label',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=12848-9526&mode=dev',
        },
    },
};

export default meta;
