import type { Meta, StoryObj } from '@storybook/react';
import { InputTime } from './inputTime';

const meta: Meta<typeof InputTime> = {
    title: 'components/Input/InputTime',
    component: InputTime,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=10080-1869&mode=design&t=DMhjcmSjhuHsGH3N-0',
        },
    },
};

type Story = StoryObj<typeof InputTime>;

/**
 * Default usage example of the InputTime component.
 */
export const Default: Story = {
    args: {},
};

export default meta;
