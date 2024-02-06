import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '.';
import { IconType } from '../../icon';

const meta: Meta<typeof EmptyState> = {
    title: 'components/States/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=10095%3A21633&mode=dev&t=FtMO7nBXAzYBFGaW-1',
        },
    },
};

type Story = StoryObj<typeof EmptyState>;

/**
 * Default EmptyState component with minimum props.
 */
export const Default: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        objectIllustration: { object: 'LIGHTBULB' },
    },
};

/**
 * Stacked EmptyState component with full props examples for Object Illustration.
 */
export const StackedFullWithObject: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        objectIllustration: { object: 'LIGHTBULB' },
        primaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Primary Button Clicked'),
        },
        secondaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Secondary Button Clicked'),
        },
    },
    render: (args) => <EmptyState {...args} />,
};

export const NonStackedFullWithObject: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        isStacked: false,
        objectIllustration: { object: 'LIGHTBULB' },
        primaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Primary Button Clicked'),
        },
        secondaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Secondary Button Clicked'),
        },
    },
    render: (args) => <EmptyState {...args} />,
};
/**
 * Stacked EmptyState component with full props examples for Human Illustation.
 */
export const StackedFullWithHuman: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        humanIllustration: {
            body: 'VOTING',
            hairs: 'MIDDLE',
            accessory: 'EARRINGS_RHOMBUS',
            sunglasses: 'BIG_ROUNDED',
            expression: 'SMILE',
        },
        primaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Primary Button Clicked'),
        },
        secondaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Secondary Button Clicked'),
        },
    },
    render: (args) => <EmptyState {...args} />,
};

export const NonStackedFullWithHuman: Story = {
    args: {
        isStacked: false,
        heading: 'Heading',
        description: 'Description',
        humanIllustration: {
            body: 'VOTING',
            hairs: 'MIDDLE',
            accessory: 'EARRINGS_RHOMBUS',
            sunglasses: 'BIG_ROUNDED',
            expression: 'SMILE',
        },
        primaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Primary Button Clicked'),
        },
        secondaryButton: {
            label: 'Label',
            iconLeft: IconType.ADD,
            iconRight: IconType.CHEVRON_RIGHT,
            onClick: () => alert('Secondary Button Clicked'),
        },
    },
    render: (args) => <EmptyState {...args} />,
};

export default meta;
