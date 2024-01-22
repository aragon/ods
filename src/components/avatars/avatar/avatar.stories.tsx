import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
    title: 'components/Avatars/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?node-id=11953%3A12188&mode=dev',
        },
    },
};

type Story = StoryObj<typeof Avatar>;

/**
 * Default usage example of the Avatar component.
 */
export const Default: Story = {
    args: {
        src: '/icons/person.svg',
        size: 'sm',
    },
};

/**
 *  Usage of the Avatar component with the default fallback.
 */
export const DefaultFallback: Story = {
    args: {
        responsiveSize: { sm: 'md' },
    },
};

/**
 * Avatar component with a custom fallback
 */
export const CustomFallback: Story = {
    args: {
        src: 'broken-image',
        size: 'lg',
        fallback: <span className="flex size-full items-center justify-center bg-primary-400 text-neutral-0">SO</span>,
    },
};

export default meta;
