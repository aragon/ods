import { type IDataListItemProps } from '../../../../../core';

export interface IVotesDataListItemStructureProps extends IDataListItemProps {}

export const VotesDataListItemStructure: React.FC<IVotesDataListItemStructureProps> = (props) => {
    const { children } = props;
    return <div>{children}</div>;
};
