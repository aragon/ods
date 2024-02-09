import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from '../checkboxGroup';
import { CheckboxCard } from './checkboxCard';

const meta: Meta<typeof CheckboxCard> = {
    title: 'components/Checkbox/CheckboxCard',
    component: CheckboxCard,
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8889-18652&mode=design&t=bosvPKsTZwUlGgoG-4',
        },
    },
};

type Story = StoryObj<typeof CheckboxCard>;

/**
 * Default usage of the CheckboxCard component
 */
export const Default: Story = {
    render: (props) => (
        <CheckboxGroup>
            <CheckboxCard {...props} />
        </CheckboxGroup>
    ),
    args: {
        avatar: 'https://assets-global.website-files.com/5e997428d0f2eb13a90aec8c/63f47db62df04b569e4e004e_icon_aragon.svg',
        label: 'Checkbox label',
        description: 'Checkbox description',
        tag: { label: 'Tag', variant: 'info' },
    },
};

export default meta;
