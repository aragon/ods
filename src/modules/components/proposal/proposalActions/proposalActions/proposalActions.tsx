import classNames from 'classnames';
import { useRef, useState, type ReactNode } from 'react';
import { Accordion, Button, Card, CardEmptyState, Heading } from '../../../../../core';
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
     * Custom heading for the actions list.
     */
    heading?: string;
    /**
     * Additional classes for the component.
     */
    className?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
}

export const ProposalActions: React.FC<IProposalActionsProps> = (props) => {
    const { actions, actionNames, heading, className, customActionComponents, children, ...web3Props } = props;

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
            {heading && (
                <Heading size="h2" className="border-b border-neutral-100 p-4 md:p-6">
                    {heading}
                </Heading>
            )}
            <Accordion.Container
                ref={actionsContainerRef}
                isMulti={true}
                value={expandedItems}
                onValueChange={handleAccordionValueChange}
            >
                {actions.length > 0 ? (
                    actions.map((action, index) => (
                        <ProposalActionsAction
                            key={`action-${index}`}
                            action={action}
                            index={index}
                            name={actionNames?.[action.type]}
                            CustomComponent={customActionComponents?.[action.type]}
                            {...web3Props}
                        />
                    ))
                ) : (
                    <CardEmptyState
                        heading={copy.proposalActionsContainer.empty.heading}
                        description={copy.proposalActionsContainer.empty.description}
                        isStacked={false}
                        objectIllustration={{ object: 'SMART_CONTRACT' }}
                    />
                )}
                {actions.length > 1 && (
                    <div className="mt-1 flex w-full flex-col gap-y-3 px-4 pb-4 md:flex-row-reverse md:px-6 md:pb-6">
                        <Button onClick={handleToggleAll} variant="tertiary" size="md" className="shrink-0 md:w-fit">
                            {expandedItems.length === actions.length
                                ? copy.proposalActionsContainer.collapse
                                : copy.proposalActionsContainer.expand}
                        </Button>
                    </div>
                )}
                {children}
            </Accordion.Container>
        </Card>
    );
};
