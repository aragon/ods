import classNames from 'classnames';
import type React from 'react';
import { type ComponentPropsWithoutRef } from 'react';

export interface IDialogAlertContentProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * `DialogAlert.Content` component.
 */
export const DialogAlertContent: React.FC<IDialogAlertContentProps> = ({ className, ...otherProps }) => {
    return <div className={classNames('overflow-auto px-4 md:px-6', className)} {...otherProps} />;
};
