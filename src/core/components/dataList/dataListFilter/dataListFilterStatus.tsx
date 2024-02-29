import classNames from 'classnames';
import { useDataListContext } from '../dataListContext';

export interface IDataListFilterStatusProps {}

export const DataListFilterStatus: React.FC<IDataListFilterStatusProps> = () => {
    const { state, itemsCount = 0, entityLabel } = useDataListContext();

    const isInitialLoading = state === 'initialLoading';
    const isLoading = state === 'loading';
    const isFiltered = state === 'filtered';

    const displayItemsCount = (state === 'idle' || state === 'fetchingNextPage') && itemsCount > 0;

    if (!displayItemsCount && !isInitialLoading && !isLoading && !isFiltered) {
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
                    <span>{entityLabel}</span>
                </>
            )}
            {/* TODO: apply internationalisation to Loading, Filtering and Found labels [APP-2627] */}
            {isInitialLoading && `Loading ${entityLabel}`}
            {isLoading && `Filtering ${entityLabel}`}
            {isFiltered && (
                <>
                    <span>Found </span>
                    <span className="text-primary-400">{itemsCount} </span>
                    <span>{entityLabel}</span>
                </>
            )}
        </p>
    );
};
