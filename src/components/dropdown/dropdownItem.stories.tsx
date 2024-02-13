import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, type IDropdownItemProps } from './index';

const meta: Meta<typeof Dropdown.Item> = {
    title: 'components/Dropdown/Dropdown.Item',
    component: Dropdown.Item,
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8097-22574&mode=design&t=4o7W5TmAScRx38xw-4',
        },
    },
};

type Story = StoryObj<typeof Dropdown.Item>;

/**
 * Default usage of the DropdownItem component.
 */
export const Default: Story = {
    render: (props: IDropdownItemProps) => (
        <Dropdown.Container label="Dropdown">
            <Dropdown.Item {...props} />
        </Dropdown.Container>
    ),
    args: {
        children: 'Dropdown item label',
    },
};

export const Link: Story = {
    render: (props: IDropdownItemProps) => (
        <Dropdown.Container label="Dropdown with link">
            <Dropdown.Item {...props} />
        </Dropdown.Container>
    ),
    args: {
        children: 'Dropdown link',
        href: 'https://aragon.org',
        target: '_blank',
    },
};

export default meta;
