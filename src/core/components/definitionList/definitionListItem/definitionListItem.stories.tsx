import type { Meta, StoryObj } from '@storybook/react';
import { DefinitionList, type IDefinitionListItemProps } from '../index';

const meta: Meta<typeof DefinitionList.Item> = {
    title: 'Core/Components/DefinitionList/DefinitionList.Item',
    component: DefinitionList.Item,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?m=auto&node-id=16728%3A45615&t=Q593Geqalm4meMTS-1',
        },
    },
};

type Story = StoryObj<typeof DefinitionList.Item>;

/**
 * Default usage of the DefinitionList.Item component.
 */
export const Default: Story = {
    args: {
        term: 'First Item Term',
    },
    render: (props: IDefinitionListItemProps) => (
        <DefinitionList.Container>
            <DefinitionList.Item {...props}>First item description</DefinitionList.Item>
        </DefinitionList.Container>
    ),
};

/**
 * Example usage of the DefinitionList.Item component with component child as definition description.
 */
export const WithComponent: Story = {
    args: {
        term: 'First Item Term',
    },
    render: (props: IDefinitionListItemProps) => (
        <DefinitionList.Container>
            <DefinitionList.Item {...props}>
                <div className="flex h-96 w-full items-center justify-center border border-dashed bg-success-100">
                    Any React Node Child
                </div>
            </DefinitionList.Item>
        </DefinitionList.Container>
    ),
};

export default meta;
