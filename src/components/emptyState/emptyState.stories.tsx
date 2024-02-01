import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '.';
import { IconType } from '../icon';
import { IIllustrationHumanProps, IllustrationObjectType } from '../illustrations';

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

/**
 * Default EmptyState component with minimum props.
 */
export const Default: Story = {
    args: {
        title: 'Title',
        description: 'Description',
        illustrationType: 'object',
    },
    render: (args) => {
        const getIllustration = (type: 'object' | 'human'): IllustrationObjectType | IIllustrationHumanProps => {
            if (type === 'human') {
                return {
                    body: 'VOTING',
                    hairs: 'MIDDLE',
                    accessory: 'EARRINGS_RHOMBUS',
                    sunglasses: 'BIG_ROUNDED',
                    expression: 'SMILE',
                } as IIllustrationHumanProps;
            } else {
                return 'LIGHTBULB';
            }
        };

        const illustration = getIllustration(args.illustrationType);
        //@ts-expect-error can't resolve more complicated union types in Storybook for illustation control purposes
        return <EmptyState {...args} illustration={illustration} />;
    },
};

/**
 * Stacked EmptyState component with full props examples for Object Illustration.
 */
export const StackedFullWithObject: Story = {
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
/**
 * Non-Stacked EmptyState component with full props examples for Object Illustration. <br />
 * **Note:** Human illustration, Primary Button are not available in non-stacked mode.
 */
export const NonStackedFullWithObject: Story = {
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
    render: (args) => <EmptyState {...args} />,
};
/**
 * Stacked EmptyState component with full props examples for Human Illustation.
 */
export const StackedFullWithHuman: Story = {
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
