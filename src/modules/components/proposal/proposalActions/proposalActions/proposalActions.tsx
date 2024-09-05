import classNames from 'classnames';
import { useRef, useState, type ReactNode } from 'react';
import { Accordion, Button, Card, EmptyState } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsAction } from '../proposalActionsAction';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsTypes';

export interface IProposalActionsProps extends IWeb3ComponentProps {
    /**
     * Actions to render.
     */
    actions: IProposalAction[] | [];
    /**
     * Map of action-type <=> action-name displayed on the action header.
     */
    actionNames?: Record<string, string>;
    /**
     * Map of action-type <=> custom-component to customize how actions are displayed.
     */
    customActionComponents?: Record<string, ProposalActionComponent>;
    /**
     * Additional classes for the component.
     */
    className?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Custom description for the empty state.
     */
    emptyStateDescription?: string;
}

export const ProposalActions: React.FC<IProposalActionsProps> = (props) => {
    const { actions, actionNames, className, customActionComponents, children, emptyStateDescription, ...web3Props } =
        props;

    const [expandedItems, setExpandedItems] = useState<string[]>(['0']);

    const { copy } = useOdsModulesContext();

    const actionsContainerRef = useRef<HTMLDivElement | null>(null);

    const handleToggleAll = () => {
        if (expandedItems.length === actions.length) {
            setExpandedItems([]);
        } else {
            setExpandedItems(Array.from({ length: actions.length }, (_, index) => `${index}`));
        }

        if (actionsContainerRef.current && expandedItems.length === actions.length) {
            actionsContainerRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };

    const handleAccordionValueChange = (value: string[] = []) => setExpandedItems(value);

    return (
        <Card className={classNames('w-full overflow-hidden', className)}>
            <Accordion.Container
                ref={actionsContainerRef}
                isMulti={true}
                value={expandedItems}
                onValueChange={handleAccordionValueChange}
            >
                {actions?.map((action, index) => (
                    <ProposalActionsAction
                        key={`action-${index}`}
                        action={action}
                        index={index}
                        name={actionNames?.[action.type]}
                        CustomComponent={customActionComponents?.[action.type]}
                        {...web3Props}
                    />
                ))}
                {actions.length === 0 && (
                    <EmptyState
                        heading={copy.proposalActionsContainer.empty.heading}
                        description={emptyStateDescription ?? copy.proposalActionsContainer.empty.description}
                        isStacked={false}
                        objectIllustration={{ object: 'SMART_CONTRACT' }}
                    />
                )}
                <div className="flex md:flex-col">
                    {actions.length > 1 && (
                        <div className="mt-1 flex w-full flex-col justify-between gap-y-3 px-4 pb-4 md:flex-row md:px-6 md:pb-6">
                            <Button
                                onClick={handleToggleAll}
                                variant="tertiary"
                                size="md"
                                className="shrink-0 md:w-fit"
                            >
                                {expandedItems.length === actions.length
                                    ? copy.proposalActionsContainer.collapse
                                    : copy.proposalActionsContainer.expand}
                            </Button>
                            {children}
                        </div>
                    )}
                </div>
            </Accordion.Container>
        </Card>
    );
};
