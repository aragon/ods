import type { Meta, StoryObj } from '@storybook/react';
import { IllustrationObject } from './illustrationObject';

const meta: Meta<typeof IllustrationObject> = {
    title: 'components/Illustrations/IllustrationObject',
    component: IllustrationObject,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof IllustrationObject>;

/**
 * Default usage example of the IllustrationObject component.
 */
export const Default: Story = {
    args: {
        object: 'ACTION',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8874-14443&mode=dev',
        },
    },
};

export default meta;
