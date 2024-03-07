import classNames from 'classnames';
import type React from 'react';
import { Avatar, Spinner, type IAvatarProps } from '../../../../core';
import { ENSUserLookupWrapper } from '../../../../hooks/useENSLookup';

export interface IMemberAvatarProps extends Omit<IAvatarProps, 'fallback'> {
    /**
     * User address (ENS name or 0x address)
     */
    ensNameOrAddress: string;
}

export const MemberAvatar: React.FC<IMemberAvatarProps> = (props) => {
    const { ensNameOrAddress = '', size = 'lg', className, ...otherProps } = props;

    const containerSizeClass = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    }[size];

    return (
        <ENSUserLookupWrapper ensNameOrAddress={ensNameOrAddress}>
            {({ user, isLoading }) => {
                return (
                    <div className={classNames('flex items-center justify-center', containerSizeClass)}>
                        {isLoading ? (
                            <Spinner size={size} />
                        ) : (
                            <Avatar size={size} src={user?.avatar} {...otherProps} />
                        )}
                    </div>
                );
            }}
        </ENSUserLookupWrapper>
    );
};
