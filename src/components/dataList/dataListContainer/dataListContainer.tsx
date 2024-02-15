import classNames from 'classnames';
import { Children, useEffect, useMemo, type ComponentProps, type ReactElement } from 'react';
import { useDataListContext } from '../dataListContext';

export interface IDataListContainerProps extends ComponentProps<'div'> {}

export const DataListContainer: React.FC<IDataListContainerProps> = (props) => {
    const { children, className, ...otherProps } = props;

    const { maxItems, currentPage, setChildrenItemCount } = useDataListContext();

    const processedChildren = Children.toArray(children) as ReactElement[];

    const paginatedChildren = useMemo(
        () => processedChildren?.slice(0, maxItems * (currentPage + 1)) ?? [],
        [processedChildren, maxItems, currentPage],
    );

    useEffect(() => {
        setChildrenItemCount(processedChildren.length);
    }, [setChildrenItemCount, processedChildren.length]);

    return (
        <div className={classNames('flex flex-col gap-2', className)} {...otherProps}>
            {paginatedChildren}
        </div>
    );
};
