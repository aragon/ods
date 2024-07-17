import classNames from 'classnames';
import { useState } from 'react';
import { Accordion, Button, Card, Heading, type ICardProps, Tabs } from '../../../../../core';
import { ProposalActionsAction } from '../proposalActionsAction';
import { useProposalActionsContext } from '../proposalActionsContext';
import { type IProposalAction } from '../proposalActionsTypes';

export interface IProposalActionsContainerProps extends ICardProps {
    /**
     * Actions to display
     */
    actions: IProposalAction[];
    /**
     * Callback to handle action selection
     */
    containerName: string;
    /**
     * Tabs list to display with values
     */
    tabs: Array<{
        label: string;
        value: string;
    }>;
}

export const ProposalActionsContainer: React.FC<IProposalActionsContainerProps> = (props) => {
    const { actions, tabs, containerName, className } = props;
    const { activeTab, setActiveTab } = useProposalActionsContext();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const handleToggleAll = () => {
        if (expandedItems.length === actions.length) {
            setExpandedItems([]);
        } else {
            setExpandedItems(actions.map((_, index) => `${index}-action`));
        }
    };

    const handleToggleItem = (index: number) => {
        if (expandedItems.includes(`${index}-action`)) {
            setExpandedItems(expandedItems.filter((item) => item !== `${index}-action`));
        } else {
            setExpandedItems([...expandedItems, `${index}-action`]);
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
                    <div className="mb-6 flex flex-col gap-y-1" key={`composer-${index}`}>
                        <p className="text-lg font-semibold">Function Name: {action.inputData?.function}</p>
                        <p>Contract Address: {action.contractAddress}</p>
                        <p>Input Data: {JSON.stringify(action.inputData, null, 2)}</p>
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
        <Card className={classNames('w-full', className)}>
            <Heading size="h2" className="px-4 pt-4 md:px-6 md:pt-6">
                {containerName}
            </Heading>
            <Tabs.Root defaultValue={activeTab} onValueChange={(value) => setActiveTab(value)} isUnderlined={true}>
                <Tabs.List className="px-4 md:px-6">
                    {tabs.map((tab) => (
                        <Tabs.Trigger key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                </Tabs.List>
                <Tabs.Content value="basic" className="grid grid-cols-1 gap-y-2 md:gap-y-4">
                    <Accordion.Container
                        isMulti={true}
                        value={expandedItems}
                        onValueChange={handleAccordionValueChange}
                    >
                        {renderActionsForTab('basic')}
                    </Accordion.Container>
                    {/* TODO: implement button cluster and logic */}
                    {actions.length > 1 && (
                        <Button onClick={handleToggleAll} variant="tertiary" className="mx-4 mb-4 md:mx-6 md:mb-6">
                            {expandedItems.length === actions.length ? 'Collapse All' : 'Expand All'}
                        </Button>
                    )}
                </Tabs.Content>
                <Tabs.Content className="p-4 md:p-6" value="composer">
                    {renderActionsForTab('composer')}
                </Tabs.Content>
                <Tabs.Content className="p-4 md:p-6" value="code">
                    {renderActionsForTab('code')}
                </Tabs.Content>
            </Tabs.Root>
        </Card>
    );
};
