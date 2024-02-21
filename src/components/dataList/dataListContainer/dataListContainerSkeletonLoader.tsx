export interface IDataListContainerSkeletonLoaderProps {}

export const DataListContainerSkeletonLoader: React.FC<IDataListContainerSkeletonLoaderProps> = () => {
    return (
        <div className="flex animate-pulse flex-col gap-3">
            <div className="h-2 grow rounded bg-neutral-50" />
            <div className="h-2 grow rounded bg-neutral-50" />
            <div className="h-2 w-1/3 rounded bg-neutral-50" />
        </div>
    );
};
