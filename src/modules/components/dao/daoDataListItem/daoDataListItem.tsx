import type React from 'react';
import { DataList, Heading, Icon, IconType, type IDataListItemProps } from '../../../../core';
import { DaoAvatar } from '../daoAvatar';

export interface IDaoDataListItemProps extends IDataListItemProps {
    name?: string;
    logoSrc?: string;
    description?: string;
    address?: string;
    ens?: string;
    plugin?: string;
    network?: string;
}

export const DaoDataListItem: React.FC<IDaoDataListItemProps> = (props) => {
    const { name, logoSrc, description, network, plugin = 'token-based', address, ens, ...otherProps } = props;

    return (
        <DataList.Item {...otherProps}>
            <div className="space-y-4">
                <div className=" flex w-full justify-between">
                    <div className="space-y-1.5 text-neutral-800">
                        <Heading size="h2" as="h1">
                            {name}
                        </Heading>
                        <Heading size="h4" as="h2">
                            {ens ?? address}
                        </Heading>
                    </div>
                    <DaoAvatar {...{ name, src: logoSrc }} size="md" />
                </div>
                <p className="line-clamp-2 text-base font-normal leading-normal text-neutral-500 md:text-lg">
                    {description}
                </p>
                <div className="flex space-x-8 text-neutral-400">
                    <div className="flex items-center gap-2 text-sm md:text-base">
                        <span className="capitalize">{network}</span>
                        <Icon icon={IconType.BLOCKCHAIN_BLOCKCHAIN} />
                    </div>
                    <div className="flex items-center gap-2  text-sm md:text-base">
                        <span className="capitalize">{plugin}</span>
                        <Icon icon={IconType.APP_MEMBERS} />
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
