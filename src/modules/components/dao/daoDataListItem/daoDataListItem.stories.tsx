import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../core/components/dataList';
import { DaoDataListItem } from './daoDataListItem';

const meta: Meta<typeof DaoDataListItem> = {
    title: 'Modules/Components/Dao/DaoDataListItem',
    component: DaoDataListItem,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=3259-11363&mode=dev',
        },
    },
};

type Story = StoryObj<typeof DaoDataListItem>;

/**
 * Default usage example of the DaoDataListItem component.
 */
export const Default: Story = {
    args: {
        name: 'Patito DAO',
        src: 'https://cdn.discordapp.com/icons/672466989217873929/acffa3e9e09ac5962ff803a5f8649040.webp?size=240',
        description:
            'Papito DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.',
        plugin: 'token-based',
        network: 'Ethereum Mainnet',
        daoAddressOrEns: 'patito.dao.eth',
    },
    render: (props) => (
        <DataList.Root entityLabel="Daos">
            <DataList.Container>
                <DaoDataListItem {...props} />
            </DataList.Container>
        </DataList.Root>
    ),
};

/**
 *  Usage of the DaoDataListItem without an image src.
 */
export const Mobile: Story = {
    args: {
        name: 'Patito DAO',
        description:
            'Papito DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.',
        plugin: 'token-based',
        network: 'Ethereum Mainnet',
        daoAddressOrEns: 'patito.dao.eth',
    },
    render: (props) => (
        <DataList.Root entityLabel="Daos">
            <DataList.Container>
                <DaoDataListItem {...props} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
