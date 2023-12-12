import type { Meta, StoryObj } from '@storybook/react';
import { InputNumberMax } from './inputNumberMax';

const meta: Meta<typeof InputNumberMax> = {
    title: 'components/Input/InputNumberMax',
    component: InputNumberMax,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=17-292&mode=design&t=dehPZplRn0YEdOuB-4',
        },
    },
};

type Story = StoryObj<typeof InputNumberMax>;

/**
 * Default usage example of the InputNumberMax component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Placeholder',
        max: 100,
    },
};

export default meta;
