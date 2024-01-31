import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'components/Checkboxes/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8322-22460&mode=design&t=l7HfAdX7WAtBtHYX-4',
        },
    },
};

type Story = StoryObj<typeof Checkbox>;

/**
 * Default usage example of the Checkbox component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
