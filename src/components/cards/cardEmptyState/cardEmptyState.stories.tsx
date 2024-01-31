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
        title: 'Title',
        description: `Description`,
        primaryButton: {
            children: 'Label',
            variant: 'primary',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            size: 'lg',
        },
        secondaryButton: {
            children: 'Label',
            variant: 'secondary',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            size: 'lg',
        },
        illustration: 'LIGHTBULB',
    },
};

export default meta;
