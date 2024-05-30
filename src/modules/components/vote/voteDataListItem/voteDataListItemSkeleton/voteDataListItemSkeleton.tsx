import { DataList, StateSkeletonBar, StateSkeletonCircular, type IDataListItemProps } from '../../../../../core';

export interface IVoteDataListItemSkeletonProps extends IDataListItemProps {}

export const VoteDataListItemSkeleton: React.FC<IVoteDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item tabIndex={0} aria-busy="true" aria-label="loading" {...otherProps}>
            <div className="flex items-center gap-x-3 py-0.5 md:gap-x-4">
                <StateSkeletonCircular className="shrink-0" responsiveSize={{ md: 'md' }} />
                <div className="flex w-full flex-col gap-y-1 text-base font-normal leading-tight md:gap-y-1.5 md:text-lg">
                    <StateSkeletonBar width="60%" responsiveSize={{ md: 'lg' }} />
                    <StateSkeletonBar width="25%" responsiveSize={{ md: 'lg' }} />
                </div>
                <StateSkeletonBar className="max-w-12 shrink-0" responsiveSize={{ md: 'lg' }} />
            </div>
        </DataList.Item>
    );
};
