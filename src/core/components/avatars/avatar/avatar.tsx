import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import type React from 'react';
import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../../types';
import { responsiveUtils } from '../../../utils';
import { AvatarBase } from '../avatarBase';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IAvatarProps extends ComponentPropsWithoutRef<'img'> {
    /**
     *  Fallback content to display when the image fails to load or no image is provided.
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
        sm: 'w-8 h-8',
        md: 'md:w-8 md:h-8',
        lg: 'lg:w-8 lg:h-8',
        xl: 'xl:w-8 xl:h-8',
        '2xl': '2xl:w-8 2xl:h-8',
    },
    lg: {
        sm: 'w-10 h-10',
        md: 'md:w-10 md:h-10',
        lg: 'lg:w-10 lg:h-10',
        xl: 'xl:w-10 xl:h-10',
        '2xl': '2xl:w-10 2xl:h-10',
    },
    xl: {
        sm: 'w-14 h-14',
        md: 'md:w-14 md:h-14',
        lg: 'lg:w-14 lg:h-14',
        xl: 'xl:w-14 xl:h-14',
        '2xl': '2xl:w-14 2xl:h-14',
    },
    '2xl': {
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
    const { alt = 'avatar', className, fallback, responsiveSize = {}, size = 'sm', ...imageProps } = props;

    const [imgLoading, setImgLoading] = useState(true);

    const containerClassNames = classNames(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full [position:var(--ods-avatar-container-position)]',
        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
        className,
    );

    const handleOnLoadingStatusChange = (status: RadixAvatar.ImageLoadingStatus) => {
        setImgLoading(status === 'loading');
    };

    const showFallback = fallback != null && !imgLoading;

    return (
        <RadixAvatar.Root className={containerClassNames}>
            <RadixAvatar.Image
                alt={alt}
                className="size-full rounded-[inherit] object-cover"
                onLoadingStatusChange={handleOnLoadingStatusChange}
                asChild={true}
                {...imageProps}
            >
                <AvatarBase />
            </RadixAvatar.Image>
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
