import type { Meta, StoryObj } from '@storybook/react';
import { AvatarIcon } from '../../avatars';
import { IconType } from '../../icon';
import { IllustrationHuman } from '../../illustrations';
import { DefinitionList, type IDefinitionListContainerProps } from '../index';

const meta: Meta<typeof DefinitionList.Container> = {
    title: 'Core/Components/DefinitionList/DefinitionList.Container',
    component: DefinitionList.Container,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?m=auto&node-id=16728%3A45615&t=Q593Geqalm4meMTS-1',
        },
    },
};

type Story = StoryObj<typeof DefinitionList.Container>;

/**
 * Default usage of the DefinitionListContainer component.
 */
export const Default: Story = {
    render: (props: IDefinitionListContainerProps) => (
        <DefinitionList.Container {...props}>
            <DefinitionList.Item label="First Term  with longer label testing">
                <IllustrationHuman hairs="AFRO" body="BLOCKS" expression="CRYING" className="flex grow" />
            </DefinitionList.Item>
            <DefinitionList.Item label="Second Term">Second item description</DefinitionList.Item>
            <DefinitionList.Item label="Third Term with longer label testing">
                <AvatarIcon size="lg" icon={IconType.APP_ASSETS} />
                <AvatarIcon size="lg" icon={IconType.APP_ASSETS} />
                <AvatarIcon size="lg" icon={IconType.APP_ASSETS} />
            </DefinitionList.Item>
        </DefinitionList.Container>
    ),
};

export default meta;
