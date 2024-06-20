import classNames from 'classnames';
import type { ComponentProps } from 'react';

export interface ICheckboxGroupProps extends ComponentProps<'div'> {}

export const CheckboxGroup: React.FC<ICheckboxGroupProps> = (props) => {
    const { className, ...otherProps } = props;

    return <div className={classNames('flex min-w-0 flex-col gap-2 md:gap-3', className)} {...otherProps} />;
};
