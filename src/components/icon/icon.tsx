import type { SVGProps } from 'react';
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
    size?: 'sm' | 'md' | 'lg';
}

const sizeToDimentions: Record<IconSize, { width: number; height: number }> = {
    ['sm']: { width: 12, height: 12 },
    ['md']: { width: 16, height: 16 },
    ['lg']: { width: 20, height: 20 },
};

export const Icon: React.FC<IIconProps> = (props) => {
    const { icon, size = 'md', style, ...otherProps } = props;
    const Icon = iconList[icon];

    const computedStyle = { ...style, ...sizeToDimentions[size] };

    return <Icon style={computedStyle} {...otherProps} />;
};
