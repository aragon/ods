import { createContext, useContext, type ReactNode } from 'react';

interface TabsContextType {
    isUnderlined: boolean;
    children?: ReactNode;
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('useTabsContext must be used within a TabsProvider');
    }
    return context;
};

export const TabsProvider: React.FC<TabsContextType> = ({ children, isUnderlined }) => {
    return <TabsContext.Provider value={{ isUnderlined }}>{children}</TabsContext.Provider>;
};
