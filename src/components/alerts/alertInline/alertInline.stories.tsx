import type { Meta, StoryObj } from '@storybook/react';
import { AlertInline } from './alertInline';

const meta: Meta<typeof AlertInline> = {
    title: 'components/Alerts/AlertInline',
    component: AlertInline,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=22-208&mode=design&t=SszxFX4rPdpRifNQ-4',
        },
    },
};

type Story = StoryObj<typeof AlertInline>;

/**
 * Default usage example of AlertInline component.
 */
export const Default: Story = {
    args: {
        message: 'Alert Message',
    },
};

export default meta;
