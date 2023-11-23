import classNames from 'classnames';
import type React from 'react';
import { useEffect, useState, type HTMLAttributes } from 'react';
import Blockies from 'react-blockies';

import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../../types';
import { addressUtils, responsiveUtils } from '../../../utils';
import { FallbackAvatar } from './fallbackAvatar';

type AvatarSize = 'sm' | 'md' | 'lg';

export interface IAvatarProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of the avatar.
     * @default md
     */
    size?: AvatarSize;
    /**
     * Image source.
     * An address or Ens domain will result in a corresponding Blockies
     * avatar shown as a fallback provided an omitted or broken `src`.
     */
    src?: string;
    /**
     * A two letter initial from this label is displayed as a fallback
     * when the `src` is either omitted or points to a broken image.
     *
     * @example
     * // Results in the fallback 'JD' due to a multi-word copy.
     * 'John Doe'
     *
     * @example
     * // Results in the fallback 'Al' due to a single-word copy.
     * 'Alice'
     */
    copy?: string;

    /**
     * Responsive size attributes for different screen sizes.
     */
    responsiveSize?: ResponsiveAttribute<AvatarSize>;
}

const DEFAULT_SQUARES = 8;

const responsiveSizeClasses: ResponsiveAttributeClassMap<AvatarSize> = {
    sm: {
        sm: 'w-6 h-6',
        md: 'md:w-6 md:h-6',
        lg: 'lg:w-6 lg:h-6',
    },
    md: {
        sm: 'w-10 h-10',
        md: 'md:w-10 md:h-10',
        lg: 'lg:w-10 lg:h-10',
    },
    lg: {
        sm: 'w-16 h-16',
        md: 'md:w-16 md:h-16',
        lg: 'lg:w-16 lg:h-16',
    },
};

/**
 * Avatar component.
 */
export const Avatar: React.FC<IAvatarProps> = (props) => {
    const { className, size = 'md', responsiveSize = {}, src, copy, ...rest } = props;

    const containerClasses = classNames(
        'flex items-center justify-center overflow-hidden rounded-full',
        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
        className,
    );

    const [imgErr, setImgErr] = useState(false);

    // clear the image error when the src changes
    useEffect(clearImgError, [src]);

    function handleImgError() {
        setImgErr(true);
    }

    function clearImgError() {
        setImgErr(false);
    }

    // address or ens with broken or no image src
    if (addressUtils.isAddress(src) || addressUtils.isEnsDomain(src)) {
        return (
            <div data-testid="avatar" {...rest} className={containerClasses}>
                {/* Note: have to overwrite blockies size with important modifier */}
                {/* in order to keep the "image" quality when using responsive sizes */}
                <Blockies data-testid="blockies" seed={src!} size={DEFAULT_SQUARES} className="!h-full !w-full" />
            </div>
        );
    }

    // copy with broken or no image src
    if (copy && (!src || imgErr)) {
        return (
            <FallbackAvatar className={classNames('bg-primary-700', containerClasses)}>
                <p className="text-base/tight font-semibold text-neutral-0">{getInitials(copy)}</p>
            </FallbackAvatar>
        );
    }

    // no copy with broken or no image src
    if (!copy && (!src || imgErr)) {
        return <FallbackAvatar className={classNames('bg-neutral-700', containerClasses)} />;
    }

    // valid image src
    return (
        <div data-testid="avatar" {...rest} className={containerClasses}>
            <img src={src} alt="avatar" onError={handleImgError} className="rounded-full object-cover" />
        </div>
    );
};

Avatar.displayName = 'Avatar';

/**
 * Function to retrieve initials from a string.
 * @param str - Input string for.
 * @returns two letters of a single-word string or
 * the first letters of the first two words of a multi-word copy.
 */
function getInitials(str: string): string {
    const arr = str.trim().split(' ');

    if (arr.length === 1) {
        return arr[0][0];
    } else {
        return arr[0][0] + arr[1][0];
    }
}
