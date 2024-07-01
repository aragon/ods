import type { Meta, StoryObj } from '@storybook/react';
import { Rerender } from './Rerender';

const meta: Meta<typeof Rerender> = {
    title: 'Core/Components/Rerender',
    component: Rerender,
};

type Story = StoryObj<typeof Rerender>;

/**
 * Default usage example of the Rerender component.
 */
export const Default: Story = {
    render: (args) => (
        <Rerender intervalDuration={args.intervalDuration}>{(time) => <div>Current Time: {time}</div>}</Rerender>
    ),
    args: {
        intervalDuration: 1000,
    },
};

export default meta;
