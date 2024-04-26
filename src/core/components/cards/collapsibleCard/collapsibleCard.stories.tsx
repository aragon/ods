import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleCard } from './collapsibleCard';

const meta: Meta<typeof CollapsibleCard> = {
    title: 'Core/Components/Cards/CollapsibleCard',
    component: CollapsibleCard,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=10157-27011&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof CollapsibleCard>;

/**
 * Default usage example of the Card component.
 */
export const Default: Story = {};

export default meta;
