import classNames from 'classnames';
import type { SVGProps } from 'react';

import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';
import { iconList } from './iconList';
import type { IconType } from './iconType';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IIconProps extends SVGProps<SVGSVGElement> {
    /**
     * Icon to be displayed.
     */
    icon: IconType;
    /**
     * Size of the icon.
     * @default md
     */
    size?: IconSize;
    /**
     * Size of the icon depending on the current breakpoint.
     */
    responsiveSize?: ResponsiveAttribute<IconSize>;
}

const responsiveSizeClassNames: ResponsiveAttributeClassMap<IconSize> = {
    sm: {
        sm: 'w-3 h-3',
        md: 'md:w-3 md:h-3',
        lg: 'lg:w-3 lg:h-3',
        xl: 'xl:w-3 xl:h-3',
        '2xl': '2xl:w-3 2xl:h-3',
    },
    md: {
        sm: 'w-4 h-4',
        md: 'md:w-4 md:h-4',
        lg: 'lg:w-4 lg:h-4',
        xl: 'xl:w-4 xl:h-4',
        '2xl': '2xl:w-4 2xl:h-4',
    },
    lg: {
        sm: 'w-5 h-5',
        md: 'md:w-5 md:h-5',
        lg: 'lg:w-5 lg:h-5',
        xl: 'xl:w-5 xl:h-5',
        '2xl': '2xl:w-5 2xl:h-5',
    },
};

export const Icon: React.FC<IIconProps> = (props) => {
    const { icon, size = 'md', className, responsiveSize = {}, ...otherProps } = props;

    const IconComponent = iconList[icon];

    const sizeClassNames = responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClassNames);

    return <IconComponent className={classNames(sizeClassNames, className)} {...otherProps} />;
};
