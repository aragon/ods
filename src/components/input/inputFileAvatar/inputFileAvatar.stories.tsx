import type { Meta, StoryObj } from '@storybook/react';
import { InputFileAvatar } from './inputFileAvatar';

const meta: Meta<typeof InputFileAvatar> = {
    title: 'components/Input/InputFileAvatar',
    component: InputFileAvatar,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=11970%3A18464&mode=design&t=vme2iG22v3jenK5f-1',
        },
    },
};

type Story = StoryObj<typeof InputFileAvatar>;

/**
 * Default usage example of the InputContainer component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
