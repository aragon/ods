import classNames from 'classnames';
import { useDataListContext } from '../dataListContext';

export interface IDataListFilterStatusProps {}

export const DataListFilterStatus: React.FC<IDataListFilterStatusProps> = () => {
    const { state, itemsCount = 0, entityLabel } = useDataListContext();

    const displayItemsCount = (state === 'idle' || state === 'fetchingNextPage') && itemsCount > 0;

    const isInitialLoading = state === 'initialLoading';
    const isLoading = state === 'loading';

    if (!displayItemsCount && !isInitialLoading && !isLoading) {
        return null;
    }

    return (
        <p
            className={classNames(
                'px-3 text-sm font-normal leading-tight text-neutral-500 md:px-6 md:text-base',
                { 'text-primary-400': isLoading || isInitialLoading },
                { 'text-neutral-500': displayItemsCount },
            )}
        >
            {displayItemsCount && (
                <>
                    <span className="text-neutral-800">{itemsCount} </span>
                    {entityLabel}
                </>
            )}
            {state === 'initialLoading' && `Loading ${entityLabel}`}
            {state === 'loading' && `Filtering ${entityLabel}`}
        </p>
    );
};
