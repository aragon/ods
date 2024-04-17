import classNames from 'classnames';
import type React from 'react';
import { DataList, StateSkeletonBar, type IDataListItemProps } from '../../../../../core';

export interface IProposalDataListItemSkeletonProps extends IDataListItemProps {}

export const ProposalDataListItemSkeleton: React.FC<IProposalDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <DataList.Item
            tabIndex={0}
            aria-busy="true"
            aria-label="loading"
            className={classNames('flex flex-col gap-y-4 bg-neutral-0 py-4 md:py-5', classNames)}
            {...otherProps}
        >
            <div className="flex justify-between">
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="18%" />
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="33.5%" />
            </div>
            <div className="flex flex-col gap-y-2">
                <StateSkeletonBar size="xl" className="w-44 md:w-96" width="60%" />
                <div className="flex flex-col gap-y-1 md:gap-y-2">
                    <StateSkeletonBar size="lg" width="100%" />
                    <StateSkeletonBar size="lg" width="84%" />
                </div>
            </div>
            <div className="flex justify-between">
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="33.33%" />
                <StateSkeletonBar size="lg" responsiveSize={{ md: 'xl' }} width="18%" />
            </div>
        </DataList.Item>
    );
};
