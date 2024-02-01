import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '.';
import { Card } from '../cards';
import { IconType } from '../icon';

const meta: Meta<typeof EmptyState> = {
    title: 'components/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=10157-27206&mode=dev',
        },
    },
};

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    args: {
        title: 'Title',
        description: 'Description',
        illustrationType: 'object',
        illustration: 'LIGHTBULB', // Default object illustration
    },
};

export const StackedWithObject: Story = {
    args: {
        title: 'Title',
        description: 'Description',
        illustrationType: 'object',
        illustration: 'LIGHTBULB',
        primaryButton: {
            label: 'Primary Action',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
        },
        secondaryButton: {
            label: 'Secondary Action',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
        },
    },
    render: (args) => <EmptyState {...args} />,
};

export const NonStackedWithObject: Story = {
    args: {
        title: 'Title',
        description: 'Description',
        isStacked: false,
        illustrationType: 'object',
        illustration: 'LIGHTBULB',
        secondaryButton: {
            label: 'Secondary Action',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
        },
    },
    render: (args) => (
        <Card>
            <EmptyState {...args} />
        </Card>
    ),
};

export const StackedWithHuman: Story = {
    args: {
        title: 'Title',
        description: 'Description',
        illustrationType: 'human',
        illustration: {
            body: 'VOTING',
            hairs: 'MIDDLE',
            accessory: 'EARRINGS_RHOMBUS',
            sunglasses: 'BIG_ROUNDED',
            expression: 'SMILE',
        },
        primaryButton: {
            label: 'Primary Action',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
        },
        secondaryButton: {
            label: 'Secondary Action',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
        },
    },
    render: (args) => <EmptyState {...args} />,
};

export default meta;
