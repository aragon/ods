import type { Meta, StoryObj } from '@storybook/react';
import { IconType } from '../../icon';
import { CardEmptyState } from './cardEmptyState';

const meta: Meta<typeof CardEmptyState> = {
    title: 'components/Cards/CardEmptyState',
    component: CardEmptyState,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=10157-27206&mode=dev',
        },
    },
};

type Story = StoryObj<typeof CardEmptyState>;

/**
 * Default usage example of the CardSummary component.
 */
export const Default: Story = {
    args: {
        value: '5',
        description: 'Proposals created',
        action: { label: 'Create proposal', onClick: () => alert('Click') },
        icon: IconType.APP_GOVERNANCE,
    },
};

/**
 * Set the `isStacked` property to false to render a CardSummary component with a horizontal layout (only rendered on screens > MD).
 */
export const HorizontalLayout: Story = {
    args: {
        value: '22',
        description: 'Members',
        action: { label: 'Delegate', onClick: () => alert('Click') },
        icon: IconType.APP_COMMUNITY,
        isStacked: false,
    },
};

export default meta;
