import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { Progress } from '../../progress';
import { useDataListContext } from '../dataListContext';

export interface IDataListPaginationProps extends ComponentProps<'div'> {}

export const DataListPagination: React.FC<IDataListPaginationProps> = (props) => {
    const { className, ...otherProps } = props;

    const { state, maxItems, currentPage, setCurrentPage, itemsCount } = useDataListContext();
    const currentlyDisplayed = Math.min(maxItems * (currentPage + 1), itemsCount ?? 1);

    const progressValue = (currentlyDisplayed * 100) / (itemsCount ?? 1);

    const hasMore = currentlyDisplayed < (itemsCount ?? 1);
    const isInitialLoading = state === 'loading';

    const handleLoadMoreClick = () => setCurrentPage(currentPage + 1);

    if (isInitialLoading) {
        return null;
    }

    return (
        <div className={classNames('flex flex-row items-center gap-6', className)} {...otherProps}>
            <Button
                size="md"
                variant="tertiary"
                iconRight={IconType.CHEVRON_DOWN}
                className="shrink-0"
                onClick={handleLoadMoreClick}
                disabled={!hasMore ?? isInitialLoading}
            >
                More
            </Button>
            {itemsCount && (
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
