import type React from 'react';
import { DataList, type IDataListItemProps } from '../../../../../core';
import { StateSkeletonBar } from '../../../../../core/components/states/stateSkeletonBar';
import { StateSkeletonCircular } from '../../../../../core/components/states/stateSkeletonCircular';

export interface IAssetDataListItemSkeletonProps extends IDataListItemProps {}

export const AssetDataListItemSkeleton: React.FC<IAssetDataListItemSkeletonProps> = (props) => {
    const { className, ...otherProps } = props;
    return (
        <DataList.Item {...otherProps}>
            <div className="flex w-full gap-x-3 py-0 md:py-1.5">
                <StateSkeletonCircular responsiveSize={{ md: 'md' }} />
                <div className=" flex w-full justify-between">
                    <div className="flex flex-col gap-y-0.5">
                        <StateSkeletonBar size="md" width="w-1/2" />
                        <StateSkeletonBar size="md" width="w-1/4" />
                    </div>
                    <div className="flex flex-col items-end justify-center gap-y-0.5">
                        <StateSkeletonBar size="md" width="w-1/6" />
                        <StateSkeletonBar size="md" width="w-1/8" />
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
