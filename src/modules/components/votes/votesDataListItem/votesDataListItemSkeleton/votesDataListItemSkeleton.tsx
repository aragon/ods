import { type IDataListItemProps } from '../../../../../core';

export interface IVotesDataListItemSkeletonProps extends IDataListItemProps {}

export const VotesDataListItemSkeleton: React.FC<IVotesDataListItemSkeletonProps> = (props) => {
    const { children } = props;
    return <div>{children}</div>;
};
