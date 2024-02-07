import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../checkbox';
import { CheckboxGroup } from './checkboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
    title: 'components/Checkbox/CheckboxGroup',
    component: CheckboxGroup,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8322-22460&mode=design&t=l7HfAdX7WAtBtHYX-4',
        },
    },
};

type Story = StoryObj<typeof CheckboxGroup>;

/**
 * Default usage of the CheckboxGroup component.
 */
export const Default: Story = {
    render: (props) => (
        <CheckboxGroup {...props}>
            <Checkbox label="First" />
            <Checkbox label="Second" />
            <Checkbox label="Third" />
        </CheckboxGroup>
    ),
};

export default meta;
