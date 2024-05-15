import { createContext, useContext } from 'react';

export const DefinitionListContext = createContext<boolean | null>(null);

export const useDefinitionListContext = (): boolean => {
    const context = useContext(DefinitionListContext);
    if (context === null) {
        throw new Error('DefinitionList.Item must be used within a DefinitionList.Container');
    }
    return context;
};
