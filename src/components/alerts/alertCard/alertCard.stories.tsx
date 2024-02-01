import type { Meta, StoryObj } from '@storybook/react';
import { AlertCard } from './alertCard';

const meta: Meta<typeof AlertCard> = {
    title: 'components/Alerts/AlertCard',
    component: AlertCard,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=718-9005&mode=design&t=SszxFX4rPdpRifNQ-4',
        },
    },
};

type Story = StoryObj<typeof AlertCard>;

/**
 * Default usage example of AlertCard component.
 */
export const Default: Story = {
    args: {
        message: 'Alert message',
        description: 'Alert description',
    },
};

export default meta;
