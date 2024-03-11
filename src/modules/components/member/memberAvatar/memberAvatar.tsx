import * as blockies from 'blockies-ts';
import type React from 'react';
import { getAddress, isAddress, type Hash } from 'viem';
import { normalize } from 'viem/ens';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { Avatar, type IAvatarProps } from '../../../../core';

export interface IMemberAvatarProps extends Omit<IAvatarProps, 'fallback'> {
    /**
     * ENS name of the user to lookup avatar src.
     */
    ensName?: string;
    /**
     * 0x address of the user to look up ENS name and avatar src.
     */
    address?: string;
    /**
     * Direct URL src of the user avatar image to be rendered.
     */
    avatarSrc?: string;
}

export const MemberAvatar: React.FC<IMemberAvatarProps> = (props) => {
    const { ensName, address, avatarSrc, size = 'sm', className, ...otherProps } = props;
    const isValidAddress = address != null && isAddress(address);
    const isValidENSName = ensName != null && ensName.length >= 7 && ensName.endsWith('.eth');

    const { data: ensAddressData, isLoading: addressLoading } = useEnsAddress({
        name: ensName,
        query: { enabled: isValidENSName && !isValidAddress && avatarSrc == null },
    });
    const resolvedAddress = isValidAddress ? address : ensAddressData;

    const { data: ensNameData, isLoading: nameLoading } = useEnsName({
        address: resolvedAddress as Hash,
        query: { enabled: resolvedAddress != null && avatarSrc == null },
    });
    const resolvedName = isValidENSName ? ensName : ensNameData;

    const { data: ensAvatarData, isLoading: avatarLoading } = useEnsAvatar({
        name: normalize(resolvedName as string),
        query: { enabled: resolvedName != null && avatarSrc == null },
    });
    const resolvedAvatarSrc = avatarSrc ?? ensAvatarData ?? undefined;

    const blockiesSrc = resolvedAddress
        ? blockies.create({ seed: getAddress(resolvedAddress) }).toDataURL()
        : undefined;

    return (
        <Avatar
            size={size}
            src={resolvedAvatarSrc}
            fallback={
                blockiesSrc && !avatarLoading && !nameLoading && !addressLoading ? (
                    <img className="size-full" src={blockiesSrc} alt="Blockies avatar" />
                ) : undefined
            }
            className={className}
            {...otherProps}
        />
    );
};
