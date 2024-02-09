import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, type IDropdownContainerProps } from './index';

const meta: Meta<typeof Dropdown.Container> = {
    title: 'components/Dropdown/DropdownContainer',
    component: Dropdown.Container,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8097-22574&mode=design&t=4o7W5TmAScRx38xw-4',
        },
    },
};

type Story = StoryObj<typeof Dropdown.Container>;

/**
 * Default usage of the DropdownContainer component.
 */
export const Default: Story = {
    render: (props: IDropdownContainerProps) => (
        <Dropdown.Container {...props}>
            <Dropdown.Item />
        </Dropdown.Container>
    ),
    args: {
        label: 'Dropdown',
    },
};

export default meta;
