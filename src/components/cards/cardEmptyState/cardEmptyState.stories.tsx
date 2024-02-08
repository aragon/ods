import { type Meta, type StoryObj } from '@storybook/react';

import { CardEmptyState } from '.';

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
 * Default EmptyStateCard component with minimum props.
 *
 * **Note:** see <EmptyState /> for more details on implementation of layout.
 */
export const Default: Story = {
    args: {
        heading: 'Heading',
        description: 'Description',
        humanIllustration: {
            body: 'VOTING',
            expression: 'SMILE',
        },
        classNameEmptyState: 'bg-critical-100 rounded-full',
        classNameCard: 'bg-success-100 p-20',
    },
};

export default meta;
