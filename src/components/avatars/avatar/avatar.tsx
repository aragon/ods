import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import type React from 'react';
import { type HTMLAttributes, type ReactNode } from 'react';
import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../../types';
import { responsiveUtils } from '../../../utils';

type AvatarSize = 'sm' | 'md' | 'lg';

export interface IAvatarProps extends HTMLAttributes<HTMLSpanElement> {
    alt?: string;
    delayMs?: number;
    fallback?: ReactNode;
    responsiveSize?: ResponsiveAttribute<AvatarSize>;
    size?: AvatarSize;
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

export const Avatar: React.FC<IAvatarProps> = (props) => {
    const { alt, className, delayMs, fallback, responsiveSize = {}, size = 'sm', src, ...rest } = props;

    const defaultClasses = classNames(
        'rounded-full',
        responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClasses),
    );

    return (
        <RadixAvatar.Root {...rest} className={classNames(defaultClasses, className)}>
            <RadixAvatar.Image alt={alt} src={src} />
            {fallback ? (
                <RadixAvatar.Fallback delayMs={delayMs}>{fallback}</RadixAvatar.Fallback>
            ) : (
                <RadixAvatar.Fallback delayMs={delayMs} className={classNames(defaultClasses, 'bg-neutral-200')} />
            )}
        </RadixAvatar.Root>
    );
};
