import type { Meta, StoryObj } from '@storybook/react';
import { InputText } from './inputText';

const meta: Meta<typeof InputText> = {
    title: 'components/Input/InputText',
    component: InputText,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=17-292&mode=design&t=dehPZplRn0YEdOuB-4',
        },
    },
};

type Story = StoryObj<typeof InputText>;

/**
 * Default usage example of the InputText component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
