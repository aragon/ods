import { type Meta, type StoryObj } from '@storybook/react';

import { CardEmptyState } from '.';
import { IconType } from '../../icon';

const meta: Meta<typeof CardEmptyState> = {
    title: 'components/Cards/CardEmptyState',
    component: CardEmptyState,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=10055-28606&mode=design&t=dehPZplRn0YEdOuB-4',
        },
    },
};

type Story = StoryObj<typeof CardEmptyState>;

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
};
/**
 * Non-Stacked EmptyState component with full props examples for Object Illustration. <br />
 * **Warning:** Non-Stacked EmptyState with Human Illustration is not supported visually.
 * As displayed, use an object illustration instead for best layout.
 */
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
};

export default meta;
