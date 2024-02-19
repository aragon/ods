import type { Meta, StoryObj } from '@storybook/react';
import { DialogAlert } from './dialogAlert';

const meta: Meta<typeof DialogAlert> = {
    title: 'components/Alerts/DialogAlert',
    component: DialogAlert,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13558-17025&mode=design&t=2c10sWNHo18bHNd3-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlert>;

/**
 * Default usage example of DialogAlert component.
 */
export const Default: Story = {
    args: {
        title: 'Dialog title',
        description: 'Optional description',
    },
};

export default meta;
