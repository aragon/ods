import classNames from 'classnames';
import { DataList, StateSkeletonBar, StateSkeletonCircular, type IDataListItemProps } from '../../../../../core';

export interface IMemberDataListItemSkeletonProps extends IDataListItemProps {}

export const MemberDataListItemSkeleton: React.FC<IMemberDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames('flex flex-col gap-y-4 bg-neutral-0 py-3 md:py-3.5', className)}
            {...otherProps}
        >
            <div className="flex flex-col items-start justify-center gap-y-3 py-2 md:min-w-44 md:gap-y-4 md:py-3 ">
                <StateSkeletonCircular size="sm" responsiveSize={{ md: 'lg' }} />

                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="100%" />

                <div className="flex w-full flex-col gap-y-2 md:gap-y-2.5">
                    <StateSkeletonBar size="md" width="70%" />
                    <StateSkeletonBar size="md" width="80%" />
                </div>
            </div>
        </DataList.Item>
    );
};
