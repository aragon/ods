import type React from 'react';
import { DataList, Heading, Icon, IconType } from '../../../../core';
import { DaoAvatar, type IDaoAvatarProps } from '../daoAvatar';

export interface IDaoDataListItemProps extends IDaoAvatarProps {
    description?: string;
    daoAddressOrEns?: string;
    plugin?: string;
    network?: string;
}

export const DaoDataListItem: React.FC<IDaoDataListItemProps> = (props) => {
    const { name, src, description, network, plugin = 'token-based', daoAddressOrEns } = props;

    return (
        <DataList.Item role="listitem">
            <div className="space-y-4">
                <div className=" flex w-full justify-between">
                    <div className="space-y-1.5 text-neutral-800">
                        <Heading size="h2" as="h1">
                            {name}
                        </Heading>
                        <Heading size="h4" as="h2">
                            {daoAddressOrEns}
                        </Heading>
                    </div>
                    <DaoAvatar {...{ name, src }} size="md" />
                </div>
                <div className="line-clamp-2 text-lg font-normal leading-normal text-neutral-500">{description}</div>
                <div className="flex space-x-8 text-neutral-400">
                    <div className="flex items-center gap-2">
                        <span className="capitalize">{network}</span>
                        <Icon icon={IconType.BLOCKCHAIN_BLOCKCHAIN} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="capitalize">{plugin}</span>
                        <Icon icon={IconType.APP_MEMBERS} />
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
