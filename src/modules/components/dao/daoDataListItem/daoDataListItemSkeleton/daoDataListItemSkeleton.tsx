import classNames from 'classnames';
import type React from 'react';
import { DataList, StateSkeletonBar, StateSkeletonCircular, type IDataListItemProps } from '../../../../../core';

export interface IDaoDataListItemSkeletonProps extends IDataListItemProps {}

export const DaoDataListItemSkeleton: React.FC<IDaoDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;
    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames('flex flex-col gap-y-4 bg-neutral-0 py-3 md:py-3.5', className)}
            {...otherProps}
        >
            <div className="grid gap-y-5 py-1.5">
                <div className="flex w-full justify-between space-x-4">
                    <div className="grid w-full gap-y-3 text-neutral-800 md:w-2/3 md:gap-y-2">
                        <StateSkeletonBar size="xl" responsiveSize={{ md: '2xl' }} width="100%" />
                        <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                    </div>
                    <StateSkeletonCircular size="lg" />
                </div>
                <div className="flex flex-col gap-y-2">
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="100%" />
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="85%" />
                </div>
                <div className="flex w-3/4 justify-between gap-x-8 text-neutral-400 md:w-1/2">
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                    <StateSkeletonBar responsiveSize={{ md: 'lg' }} width="50%" />
                </div>
            </div>
        </DataList.Item>
    );
};
