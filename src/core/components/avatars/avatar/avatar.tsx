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
        sm: 'size-6',
        md: 'md:size-6',
        lg: 'lg:size-6',
        xl: 'xl:size-6',
        '2xl': '2xl:size-6',
    },
    md: {
        sm: 'size-8',
        md: 'md:size-8',
        lg: 'lg:size-8',
        xl: 'xl:size-8',
        '2xl': '2xl:size-8',
    },
    lg: {
        sm: 'size-10',
        md: 'md:size-10',
        lg: 'lg:size-10',
        xl: 'xl:size-10',
        '2xl': '2xl:size-10',
    },
    xl: {
        sm: 'size-14',
        md: 'md:size-14',
        lg: 'lg:size-14',
        xl: 'xl:size-14',
        '2xl': '2xl:size-14',
    },
    '2xl': {
        sm: 'size-16',
        md: 'md:size-16',
        lg: 'lg:size-16',
        xl: 'xl:size-16',
        '2xl': '2xl:size-16',
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
