import { useState } from 'react';
import { Accordion, Button, Card, Heading, Tabs } from '../../../../../core';
import { ProposalActionsAction } from '../proposalActionsAction';
import { useProposalActionsContext } from '../proposalActionsContext';
import { type IProposalAction } from '../proposalActionsTypes';

export interface IProposalActionsContainerProps {
    /**
     * Actions to display
     */
    actions: IProposalAction[];
}

export const ProposalActionsContainer: React.FC<IProposalActionsContainerProps> = (props) => {
    const { actions } = props;
    const { activeTab, setActiveTab } = useProposalActionsContext();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const handleToggleAll = () => {
        if (expandedItems.length === actions.length) {
            setExpandedItems([]);
        } else {
            setExpandedItems(actions.map((_, index) => `${index}`));
        }
    };

    const handleToggleItem = (index: number) => {
        if (expandedItems.includes(`${index}`)) {
            setExpandedItems(expandedItems.filter((item) => item !== `${index}`));
        } else {
            setExpandedItems([...expandedItems, `${index}`]);
        }
    };

    const renderActionsForTab = (tab: string) => {
        switch (tab) {
            case 'basic':
                return actions.map((action, index) => (
                    <ProposalActionsAction
                        key={`action-${index}`}
                        action={action}
                        index={index}
                        onToggle={() => handleToggleItem(index)}
                    />
                ));
            case 'composer':
                return actions.map((action, index) => (
                    <div key={`composer-${index}`}>
                        <p>Function Name: {action.inputData?.function}</p>
                        <p>Contract Address: {action.to}</p>
                    </div>
                ));
            case 'code':
                return actions.map((action, index) => (
                    <div key={`code-${index}`}>
                        <pre>{JSON.stringify(action, null, 2)}</pre>
                    </div>
                ));
            default:
                return null;
        }
    };

    const handleAccordionValueChange = (value: string[] | undefined) => {
        setExpandedItems(value ?? []);
    };

    return (
        <Card className="w-full">
            <Heading className="px-6 pt-4">Actions</Heading>
            <Tabs.Root defaultValue={activeTab} onValueChange={(value) => setActiveTab(value)}>
                <Tabs.List className="px-6">
                    <Tabs.Trigger label="Basic" value="basic" />
                    <Tabs.Trigger label="Composer" value="composer" />
                    <Tabs.Trigger label="Code" value="code" />
                </Tabs.List>
                <Tabs.Content value="basic" className="grid grid-cols-1 gap-y-4">
                    <Accordion.Container
                        isMulti={true}
                        value={expandedItems}
                        onValueChange={handleAccordionValueChange}
                    >
                        {renderActionsForTab('basic')}
                    </Accordion.Container>
                    {/* TODO: implement button cluster and logic */}
                    <Button onClick={handleToggleAll} variant="tertiary" className="mx-6 mb-6">
                        {expandedItems.length === actions.length ? 'Collapse All' : 'Expand All'}
                    </Button>
                </Tabs.Content>
                <Tabs.Content value="composer">{renderActionsForTab('composer')}</Tabs.Content>
                <Tabs.Content value="code">{renderActionsForTab('code')}</Tabs.Content>
            </Tabs.Root>
        </Card>
    );
};
