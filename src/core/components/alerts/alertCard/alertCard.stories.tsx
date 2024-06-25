import type { Meta, StoryObj } from '@storybook/react';
import { AlertCard } from './alertCard';

const meta: Meta<typeof AlertCard> = {
    title: 'Core/Components/Alerts/AlertCard',
    component: AlertCard,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=718-9005&t=RVJHJFTrLMnhgYnJ-4',
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
