import type { Meta, StoryObj } from '@storybook/react';
import { IllustrationHuman } from './illustration-human';

const meta: Meta<typeof IllustrationHuman> = {
    title: 'components/IllustrationHuman',
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
