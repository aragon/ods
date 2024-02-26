import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { Progress } from '../../progress';
import { useDataListContext } from '../dataListContext';

export interface IDataListPaginationProps extends ComponentProps<'div'> {}

export const DataListPagination: React.FC<IDataListPaginationProps> = (props) => {
    const { className, ...otherProps } = props;

    const {
        state,
        maxItems,
        currentPage,
        itemsCount = 0,
        childrenItemCount = 0,
        handleLoadMore,
    } = useDataListContext();

    const currentlyDisplayed = Math.min(maxItems * (currentPage + 1), childrenItemCount);

    const progressValue = itemsCount > 0 ? (currentlyDisplayed * 100) / itemsCount : 0;

    const hasMore = currentlyDisplayed < itemsCount;

    if (state === 'initialLoading' || state === 'error' || currentlyDisplayed === 0) {
        return null;
    }

    return (
        <div className={classNames('flex flex-row items-center gap-6', className)} {...otherProps}>
            <Button
                size="md"
                variant="tertiary"
                iconRight={IconType.CHEVRON_DOWN}
                className="shrink-0"
                onClick={() => handleLoadMore(currentPage + 1)}
                disabled={!hasMore}
                isLoading={state === 'fetchingNextPage'}
            >
                More
            </Button>
            {itemsCount > 0 && (
                <>
                    <Progress value={progressValue} size="sm" responsiveSize={{ md: 'md' }} />
                    <p className="shrink-0 text-base font-normal leading-tight text-neutral-500">
                        {currentlyDisplayed} of {itemsCount} Members
                    </p>
                </>
            )}
        </div>
    );
};
