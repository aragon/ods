import type { Meta, StoryObj } from '@storybook/react';
import { ActionItem } from './actionItem';

const meta: Meta<typeof ActionItem> = {
    title: 'components/ActionItem',
    component: ActionItem,
    tags: ['autodocs'],
    argTypes: {
        href: { control: 'text' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=8011-19523&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof ActionItem>;

/**
 * Default usage example of the ActionItem component.
 */
export const Default: Story = {
    args: {
        className: 'min-w-[320px]',
        href: 'https://www.aragon.org',
        children: (
            <div className="flex flex-col">
                <p className="text-xs font-semibold leading-normal">Title</p>
                <p className="text-xs font-normal leading-normal">Description</p>
            </div>
        ),
    },
};

export default meta;
