import { type IOdsCoreCopy } from './IOdsCoreCopy';

export const enCopy: IOdsCoreCopy = {
    inputContainer: {
        optionalLabel: 'Optional',
    },
    dataListFilter: {
        filter: 'Filter',
        sort: 'Sort',
    },
    dataListFilterStatus: {
        found: 'Found',
        loadingEntity: (entityLabel: string) => `Loading ${entityLabel}`,
        filteringEntity: (entityLabel: string) => `Filtering ${entityLabel}`,
    },
    dataListPagination: {
        more: 'More',
        outOf: ({ total, entityLabel }: { total: number; entityLabel: string }) => `of ${total} ${entityLabel}`,
    },
    inputNumberMax: {
        max: 'Max',
    },
};
