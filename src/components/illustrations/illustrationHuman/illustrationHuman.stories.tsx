import type { Meta, StoryObj } from '@storybook/react';
import { IllustrationHuman } from './illustrationHuman';

const meta: Meta<typeof IllustrationHuman> = {
    title: 'components/Illustrations/IllustrationHuman',
    component: IllustrationHuman,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof IllustrationHuman>;

/**
 * Default usage example of the IllustrationObject component.
 */
export const Default: Story = {
    args: {
        body: 'ARAGON',
        expression: 'SMILE_WINK',
    },
};

export default meta;
