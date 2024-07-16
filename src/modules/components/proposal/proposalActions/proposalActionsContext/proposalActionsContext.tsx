import { createContext, useContext, useState, type PropsWithChildren } from 'react';

export interface IProposalActionsContextProps {
    /**
     * Active tab for the proposal actions terminal @default 'basic'
     */
    activeTab: string;
    /**
     * Set the active tab for the proposal actions terminal
     */
    setActiveTab: (tab: string) => void;
}

const ProposalActionsContext = createContext<IProposalActionsContextProps | undefined>(undefined);

export const useProposalActionsContext = () => {
    const context = useContext(ProposalActionsContext);
    if (!context) {
        throw new Error('useProposalActionsContext must be used within a ProposalActionsProvider');
    }
    return context;
};

export const ProposalActionsProvider: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;
    const [activeTab, setActiveTab] = useState<string>('basic');

    return (
        <ProposalActionsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </ProposalActionsContext.Provider>
    );
};
