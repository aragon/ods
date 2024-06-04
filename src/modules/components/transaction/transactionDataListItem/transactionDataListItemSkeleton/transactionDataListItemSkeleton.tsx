import { DataList, StateSkeletonBar, StateSkeletonCircular, type IDataListItemProps } from '../../../../../core';

export interface ITransactionDataListItemSkeletonProps extends IDataListItemProps {}

export const TransactionDataListItemSkeleton: React.FC<ITransactionDataListItemSkeletonProps> = (props) => {
    return (
        <DataList.Item tabIndex={0} aria-busy="true" aria-label="loading" {...props}>
            <div className="flex w-full items-center justify-between gap-x-3 border border-neutral-0 py-3 md:py-3.5">
                <StateSkeletonCircular size="sm" responsiveSize={{ md: 'md' }} />
                <div className="flex w-full items-center gap-x-3 md:gap-x-4">
                    <div className="flex w-full flex-col items-start gap-y-1 md:w-3/4">
                        <StateSkeletonBar width="100%" responsiveSize={{ md: 'lg' }} />
                        <StateSkeletonBar width="50%" responsiveSize={{ md: 'lg' }} />
                    </div>
                </div>

                <div className="flex w-3/4 flex-col items-end gap-y-1 md:w-1/3">
                    <StateSkeletonBar width="70%" responsiveSize={{ md: 'lg' }} />
                    <StateSkeletonBar width="50%" responsiveSize={{ md: 'lg' }} />
                </div>
            </div>
        </DataList.Item>
    );
};
