import * as blockies from 'blockies-ts';
import classNames from 'classnames';
import type React from 'react';
import { isAddress, type Hash } from 'viem';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { Avatar, Spinner, type IAvatarProps } from '../../../../core';

export interface IMemberAvatarProps extends Omit<IAvatarProps, 'fallback'> {
    /**
     * ENS name  of the user to lookup avatar src.
     */
    ensName?: string;
    /**
     * Ethereum 0x address of the user to look up ENS name and avatar src.
     */
    address?: string;
    /**
     * URL src of the user avatar image to be rendered.
     */
    avatarSrc?: string;
    /**
     * Loading state of the avatar for external lookups.
     */
    isLoading?: boolean;
}

export const MemberAvatar: React.FC<IMemberAvatarProps> = (props) => {
    const { ensName, address, avatarSrc, size = 'lg', className, ...otherProps } = props;
    const isValidAddress = address ? isAddress(address) : false;
    const isPossibleENSName = ensName ? ensName.length > 4 && ensName.endsWith('.eth') : false;

    const { data: ensAddressData, isLoading: addressLoading } = useEnsAddress({
        name: ensName,
        query: { enabled: isPossibleENSName },
    });
    const resolvedAddress = isValidAddress ? address : (ensAddressData as Hash);

    const { data: ensNameData, isLoading: nameLoading } = useEnsName({
        address: resolvedAddress as Hash,
        query: { enabled: !!resolvedAddress },
    });
    const resolvedName = ensName ?? (ensNameData as string);

    const { data: ensAvatarSrc, isLoading: avatarLoading } = useEnsAvatar({
        name: resolvedName,
        query: { enabled: isPossibleENSName },
    });
    const resolvedAvatarSrc = avatarSrc ? avatarSrc : (ensAvatarSrc as string);

    const blockiesSrc = resolvedAddress ? blockies.create({ seed: resolvedAddress }).toDataURL() : undefined;

    const containerSizeClass = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    }[size];

    return (
        <div className={classNames('flex shrink-0 items-center justify-center', containerSizeClass)}>
            {avatarLoading || addressLoading || nameLoading ? (
                <Spinner size={size} />
            ) : (
                <Avatar size={size} src={resolvedAvatarSrc ?? blockiesSrc} className={className} {...otherProps} />
            )}
        </div>
    );
};
