import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '.';
import { Card } from '../cards';
import { IconType } from '../icon';
import type { IIllustrationHumanProps, IllustrationObjectType } from '../illustrations';

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
    args: {
        title: 'Title',
        description: 'Description',
        illustrationType: 'object',
        isStacked: true,
    },
    argTypes: {
        illustrationType: {
            control: { type: 'select', options: ['object', 'human'] },
        },
        isStacked: {
            control: { type: 'boolean' },
        },
    },
};

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    render: (args) => {
        let illustration: IllustrationObjectType | IIllustrationHumanProps = 'LIGHTBULB'; // Default object illustration
        if (args.illustrationType === 'human' && args.isStacked) {
            illustration = {
                body: 'VOTING',
                hairs: 'MIDDLE',
                accessory: 'EARRINGS_RHOMBUS',
                sunglasses: 'BIG_ROUNDED',
                expression: 'SMILE',
            } as IIllustrationHumanProps; // Human illustration for stacked mode
        }

        return <EmptyState {...args} illustration={illustration} />;
    },
};

export const EmptyStateWithCard: Story = {
    args: {
        title: 'Title',
        description: 'Description',
        illustrationType: 'object',
        isStacked: true,
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
    },
    render: (args) => {
        let illustration: IllustrationObjectType | IIllustrationHumanProps = 'LIGHTBULB'; // Default object illustration
        if (args.illustrationType === 'human' && args.isStacked) {
            illustration = {
                body: 'VOTING',
                hairs: 'MIDDLE',
                accessory: 'EARRINGS_RHOMBUS',
                sunglasses: 'BIG_ROUNDED',
                expression: 'SMILE',
            } as IIllustrationHumanProps; // Human illustration for stacked mode
        }

        return (
            <Card>
                <EmptyState {...args} illustration={illustration} />
            </Card>
        );
    },
};

export default meta;
