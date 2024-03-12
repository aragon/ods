import type React from 'react';
import { type ComponentPropsWithoutRef } from 'react';

export interface IStatePingAnimationProps extends ComponentPropsWithoutRef<'div'> {}

export type StatePingAnimationVariant = 'primary' | 'info' | 'success' | 'warning' | 'critical';

export const StatePingAnimation: React.FC<IStatePingAnimationProps> = (props) => {
    const { className, ...otherProps } = props;

    return <span {...otherProps}>Ping</span>;
};
