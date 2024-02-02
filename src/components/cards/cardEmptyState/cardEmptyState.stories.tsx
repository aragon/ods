import { type Meta, type StoryObj } from '@storybook/react';

import { CardEmptyState } from '.';
import { IconType } from '../../icon';
import type { IIllustrationHumanProps, IllustrationObjectType } from '../../illustrations';

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

        return <CardEmptyState {...args} illustration={illustration} />;
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
    render: (args) => <CardEmptyState {...args} />,
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
    render: (args) => <CardEmptyState {...args} />,
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
    render: (args) => <CardEmptyState {...args} />,
};

export default meta;
