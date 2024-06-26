export interface IOdsCoreCopy {
    inputContainer: {
        optionalLabel: string;
    };
    dataListFilter: {
        filter: string;
        sort: string;
    };
    dataListFilterStatus: {
        found: string;
        loadingEntity: (entityLabel: string) => string;
        filteringEntity: (entityLabel: string) => string;
    };
    dataListPagination: {
        more: string;
        outOf: ({ total, entityLabel }: { total: number; entityLabel: string }) => string;
    };
    inputNumberMax: {
        max: string;
    };
}
