import type { Meta, StoryObj } from '@storybook/react';
import { StateSkeletonCircular } from './stateSkeletonCircular';

const meta: Meta<typeof StateSkeletonCircular> = {
    title: 'Core/Components/States/StateSkeletonCircular',
    component: StateSkeletonCircular,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=14335-29808&mode=design&t=eY5zUwpG8UWKcdMd-4',
        },
    },
};

type Story = StoryObj<typeof StateSkeletonCircular>;

/**
 * Default usage example of the StateSkeletonCircular component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
