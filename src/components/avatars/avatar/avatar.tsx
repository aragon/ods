import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import type React from 'react';
import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../../types';
import { responsiveUtils } from '../../../utils';

type AvatarSize = 'sm' | 'md' | 'lg';

export interface IAvatarProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     *  Alternate text for the avatar image.
     */
    alt?: string;
    /**
     *  Fallback content to display when the image fails to load or
     *  no image is provided.
     */
    fallback?: ReactNode;
    /**
     *  Responsive size attribute for the avatar.
     */
    responsiveSize?: ResponsiveAttribute<AvatarSize>;
    /**
     * The size of the avatar.
     * @default sm
     */
    size?: AvatarSize;
    /**
     *  The source URL for the avatar image.
     */
    src?: string;
}

const responsiveSizeClasses: ResponsiveAttributeClassMap<AvatarSize> = {
    sm: {
        sm: 'w-6 h-6',
        md: 'md:w-6 md:h-6',
        lg: 'lg:w-6 lg:h-6',
        xl: 'xl:w-6 xl:h-6',
        '2xl': '2xl:w-6 2xl:h-6',
    },
    md: {
        sm: 'w-10 h-10',
        md: 'md:w-10 md:h-10',
        lg: 'lg:w-10 lg:h-10',
        xl: 'xl:w-10 xl:h-10',
        '2xl': '2xl:w-10 2xl:h-10',
    },
    lg: {
        sm: 'w-16 h-16',
        md: 'md:w-16 md:h-16',
        lg: 'lg:w-16 lg:h-16',
        xl: 'xl:w-16 xl:h-16',
        '2xl': '2xl:w-16 2xl:h-16',
    },
};

/**
 * Avatar component
 */
export const Avatar: React.FC<IAvatarProps> = (props) => {
    const { alt = 'avatar', className, fallback, responsiveSize = {}, size = 'sm', src, ...rest } = props;

    const containerClassNames = classNames(
        'flex items-center justify-center overflow-hidden rounded-full',
        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
        className,
    );

    const [imgLoading, setImgLoading] = useState(true);

    const handleOnLoadingStatusChange = (status: RadixAvatar.ImageLoadingStatus) => {
        status === 'loading' ? setImgLoading(true) : setImgLoading(false);
    };

    const showFallback = !!fallback && !imgLoading;
    return (
        <RadixAvatar.Root {...rest} className={containerClassNames}>
            <RadixAvatar.Image
                alt={alt}
                src={src}
                className="size-full rounded-[inherit] object-cover"
                onLoadingStatusChange={handleOnLoadingStatusChange}
            />
            <RadixAvatar.Fallback
                data-testid="fallback"
                className={classNames(
                    'size-full rounded-[inherit]',
                    { 'animate-pulse bg-neutral-200': imgLoading },
                    { 'bg-neutral-200': !fallback },
                    { 'flex items-center justify-center': showFallback },
                )}
            >
                {showFallback && fallback}
            </RadixAvatar.Fallback>
        </RadixAvatar.Root>
    );
};
