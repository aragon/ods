import type { Meta, StoryObj } from '@storybook/react';
import { DefinitionList, type IDefinitionListItemProps } from '../index';

const meta: Meta<typeof DefinitionList.Item> = {
    title: 'Core/Components/DefinitionList/DefinitionList.Item',
    component: DefinitionList.Item,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?m=auto&node-id=16728%3A45615&t=Q593Geqalm4meMTS-1',
        },
    },
};

type Story = StoryObj<typeof DefinitionList.Item>;

/**
 * Default usage of the DefinitionListItem component.
 */
export const Default: Story = {
    args: {
        label: 'First Item',
    },
    render: (props: IDefinitionListItemProps) => (
        <DefinitionList.Container>
            <DefinitionList.Item {...props}>First item description</DefinitionList.Item>
        </DefinitionList.Container>
    ),
};

export default meta;
