import * as blockies from 'blockies-ts';
import type React from 'react';
import { getAddress, type Address } from 'viem';
import { normalize } from 'viem/ens';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { Avatar, type IAvatarProps } from '../../../../core';
import { addressUtils, ensUtils } from '../../../utils';

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
    const { ensName, address, avatarSrc, ...otherProps } = props;

    const isValidAddress = addressUtils.isAddress(address);
    const isValidENSName = ensUtils.isEnsName(ensName);

    const { data: ensAddressData, isLoading: addressLoading } = useEnsAddress({
        name: ensName,
        query: { enabled: isValidENSName && !isValidAddress && avatarSrc == null },
    });
    const resolvedAddress = isValidAddress ? address : ensAddressData;

    const { data: ensNameData, isLoading: nameLoading } = useEnsName({
        address: resolvedAddress as Address,
        query: { enabled: resolvedAddress != null && avatarSrc == null },
    });
    const resolvedName = isValidENSName ? ensName : ensNameData;

    const { data: ensAvatarData, isLoading: avatarLoading } = useEnsAvatar({
        name: resolvedName ? normalize(resolvedName) : undefined,
        query: { enabled: resolvedName != null && avatarSrc == null },
    });
    const resolvedAvatarSrc = avatarSrc ?? ensAvatarData ?? undefined;

    const blockiesSrc = resolvedAddress
        ? blockies.create({ seed: getAddress(resolvedAddress), scale: 8, size: 8 }).toDataURL()
        : undefined;

    const isLoading = avatarLoading || nameLoading || addressLoading;

    return (
        <Avatar
            src={resolvedAvatarSrc}
            fallback={
                blockiesSrc && !isLoading ? (
                    <img className="size-full" src={blockiesSrc} alt="Blockies avatar" />
                ) : undefined
            }
            {...otherProps}
        />
    );
};
