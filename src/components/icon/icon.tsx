import classNames from 'classnames';
import type { SVGProps } from 'react';

import { type ResponsiveAttribute, type ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';
import { iconList } from './iconList';
import type { IconType } from './iconType';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IIconProps extends SVGProps<SVGSVGElement> {
    icon: IconType;
    size?: IconSize;
    responsiveSize?: ResponsiveAttribute<IconSize>;
}

const iconClasses: ResponsiveAttributeClassMap<IconSize> = {
    sm: {
        sm: 'w-3 h-3',
        md: 'md:w-3 md:h-3',
        lg: 'lg:w-3 lg:h-3',
    },
    md: {
        sm: 'w-4 h-4',
        md: 'md:w-4 md:h-4',
        lg: 'lg:w-4 lg:h-4',
    },
    lg: {
        sm: 'w-5 h-5',
        md: 'md:w-5 md:h-5',
        lg: 'lg:w-5 lg:h-5',
    },
};

export const Icon: React.FC<IIconProps> = (props) => {
    const { icon, size = 'md', className, responsiveSize = {}, ...otherProps } = props;

    const IconComponent = iconList[icon];

    const classes = responsiveUtils.generateClassNames(size, responsiveSize, iconClasses);

    return <IconComponent className={classNames(classes, className)} {...otherProps} />;
};
