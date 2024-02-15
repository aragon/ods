import classNames from 'classnames';
import type { ComponentProps } from 'react';

export interface IDataListPaginationProps extends ComponentProps<'div'> {}

export const DataListPagination: React.FC<IDataListPaginationProps> = (props) => {
    const { children, className, ...otherProps } = props;

    return (
        <div className={classNames('flex', className)} {...otherProps}>
            {children}
        </div>
    );
};
