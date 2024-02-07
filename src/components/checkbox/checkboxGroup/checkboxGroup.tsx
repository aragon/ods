import classNames from 'classnames';
import type { ComponentProps } from 'react';

export interface ICheckboxGroupProps extends ComponentProps<'div'> {}

export const CheckboxGroup: React.FC<ICheckboxGroupProps> = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <div className={classNames('flex flex-col gap-2 md:gap-3', className)} {...otherProps}>
            {children}
        </div>
    );
};
