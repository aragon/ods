import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

const meta: Meta<typeof Card> = {
    title: 'components/Cards/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=10157-27011&mode=design&t=2bLCEeKZ7ueBboTs-4',
        },
    },
};

type Story = StoryObj<typeof Card>;

/**
 * Default usage example of the Card component.
 */
export const Default: Story = {
    args: {
        className: 'min-w-[320px]',
        children: (
            <div className="flex flex-col items-center p-2">
                <p className="text-xs font-semibold leading-normal">Example</p>
                <p className="text-xs font-normal leading-normal">Description</p>
            </div>
        ),
    },
};

export default meta;
