import classNames from 'classnames';
import { useState, type ComponentProps } from 'react';
import { Accordion, Button, Card, Heading } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsAction } from '../proposalActionsAction';
import type { IProposalAction } from '../proposalActionsTypes';

export interface IProposalActionsProps extends ComponentProps<'div'> {
    /**
     * Actions to render
     */
    actions: IProposalAction[];
    /**
     * Message to display in the footer
     */
    footerMessage?: string;
    /**
     * Custom action components map
     */
    customActionComponents?: Record<string, React.ComponentType<{ action: IProposalAction }>>;
}

export const ProposalActions: React.FC<IProposalActionsProps> = (props) => {
    const { copy } = useOdsModulesContext();
    const {
        actions,
        className,
        footerMessage = copy.proposalActionsContainer.footerMessage,
        customActionComponents,
        children,
    } = props;
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const handleToggleAll = () => {
        if (expandedItems.length === actions.length) {
            setExpandedItems([]);
        } else {
            setExpandedItems(Array.from({ length: actions.length }, (_, index) => `${index}`));
        }
    };

    const handleAccordionValueChange = (value: string[] | undefined) => {
        setExpandedItems(value ?? []);
    };

    return (
        <Card className={classNames('w-full', className)}>
            <Heading size="h2" className="px-4 pt-4 md:px-6 md:pt-6">
                {copy.proposalActionsContainer.containerName}
            </Heading>
            <Accordion.Container isMulti={true} value={expandedItems} onValueChange={handleAccordionValueChange}>
                {actions.map((action, index) => {
                    const CustomComponent = customActionComponents?.[action.type];
                    return (
                        <ProposalActionsAction
                            key={`action-${index}`}
                            action={action}
                            index={index}
                            customComponent={CustomComponent}
                        />
                    );
                })}
                <div className="mt-1 flex w-full flex-col gap-y-3 px-4 pb-4 md:flex-row-reverse md:px-6 md:pb-6">
                    {actions.length > 1 && (
                        <Button onClick={handleToggleAll} variant="tertiary" size="md" className="shrink-0 md:w-fit">
                            {expandedItems.length === actions.length
                                ? copy.proposalActionsContainer.collapse
                                : copy.proposalActionsContainer.expand}
                        </Button>
                    )}
                    {children}
                    <p className="w-full text-center text-sm text-neutral-500 md:text-start">{footerMessage}</p>
                </div>
            </Accordion.Container>
        </Card>
    );
};
