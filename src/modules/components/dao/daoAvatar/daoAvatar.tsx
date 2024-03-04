import classNames from 'classnames';
import type React from 'react';
import { Avatar, type IAvatarProps } from '../../../../core';

export interface IDaoAvatarProps extends Omit<IAvatarProps, 'fallback'> {
    /**
     * Name of the DAO
     */
    daoName: string;
}

export const DaoAvatar: React.FC<IDaoAvatarProps> = (props) => {
    const { daoName, size = 'lg', className, ...otherProps } = props;
    const daoInitials = getDaoInitials(daoName).toUpperCase();

    return (
        <Avatar
            size={size}
            fallback={
                <span
                    className={classNames(
                        'flex size-full shrink-0 items-center justify-center rounded-full bg-primary-400',
                        'text-xs leading-tight text-neutral-0 md:text-sm lg:text-lg',
                        className,
                    )}
                >
                    {daoInitials}
                </span>
            }
            {...otherProps}
        />
    );
};

/**
 * Get the initials for a DAO
 * @param daoName name of the DAO
 * @returns the DAO initials
 */
function getDaoInitials(daoName: IDaoAvatarProps['daoName']): string {
    if (!daoName) {
        return '';
    }

    const trimmedName = daoName.trim();

    if (trimmedName.length <= 2) {
        return trimmedName;
    }

    const words = trimmedName.split(' ');
    if (words.length < 2) {
        return words[0][0] + words[0][1];
    } else {
        return words[0][0] + words[1][0];
    }
}
