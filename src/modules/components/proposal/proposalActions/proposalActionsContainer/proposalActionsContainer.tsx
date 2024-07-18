import classNames from 'classnames';
import { cloneElement, isValidElement, type ReactElement, useState } from 'react';
import { Accordion, Button, Card, Heading, type IAccordionContainerBaseProps } from '../../../../../core';
import { type IProposalActionsActionProps } from '../proposalActionsAction';
import type { IProposalAction } from '../proposalActionsTypes';

export interface IProposalActionsContainerProps extends Omit<IAccordionContainerBaseProps<true>, 'isMulti'> {
    /**
     * Actions to display
     */
    actions: IProposalAction[];
    /**
     * Callback to handle action selection
     */
    containerName: string;
    /**
     * Additional class names for styling
     */
    footerMessage?: string;
    /**
     * Actions as custom children to render
     */
    children?: ReactElement<IProposalActionsActionProps> | Array<ReactElement<IProposalActionsActionProps>>;
    /**
     * Additional class names for styling
     */
    className?: string;
}

export const ProposalActionsContainer: React.FC<IProposalActionsContainerProps> = (props) => {
    const { containerName, footerMessage, className, children } = props;
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const childrenCount = Array.isArray(children) ? children.length : children ? 1 : 0;

    const handleToggleAll = () => {
        if (expandedItems.length === childrenCount) {
            setExpandedItems([]);
        } else {
            setExpandedItems(Array.from({ length: childrenCount }, (_, index) => `${index}-action`));
        }
    };

    const handleToggleItem = (index: number) => {
        if (expandedItems.includes(`${index}-action`)) {
            setExpandedItems(expandedItems.filter((item) => item !== `${index}-action`));
        } else {
            setExpandedItems([...expandedItems, `${index}-action`]);
        }
    };

    const handleAccordionValueChange = (value: string[] | undefined) => {
        setExpandedItems(value ?? []);
    };

    const renderChildren = () => {
        if (!children) {
            return null;
        }

        if (Array.isArray(children)) {
            return children.map((child, index) => {
                if (isValidElement(child)) {
                    return cloneElement(child, {
                        onToggle: () => handleToggleItem(index),
                    });
                }
                return child;
            });
        }

        if (isValidElement(children)) {
            return cloneElement(children, {
                onToggle: () => handleToggleItem(0),
            });
        }

        return children;
    };

    return (
        <Card className={classNames('w-full overflow-hidden', className)}>
            <Heading size="h2" className="px-4 pt-4 md:px-6 md:pt-6">
                {containerName}
            </Heading>
            <Accordion.Container isMulti={true} value={expandedItems} onValueChange={handleAccordionValueChange}>
                {renderChildren()}
                <div className="mt-1 flex w-full flex-col gap-y-3 overflow-hidden px-4 pb-4 md:flex-row-reverse md:px-6 md:pb-6">
                    {childrenCount > 1 && (
                        <Button onClick={handleToggleAll} variant="tertiary" size="md" className="shrink-0 md:w-fit">
                            {expandedItems.length === childrenCount ? 'Collapse All' : 'Expand All'}
                        </Button>
                    )}
                    {/** TODO: button cluster logic for states and tx responses **/}
                    {/** TODO: needs logic for clearing message as more buttons become available (execute, etc) **/}
                    {footerMessage && (
                        <p className="w-full text-center text-sm text-neutral-500 md:text-start">{footerMessage}</p>
                    )}
                </div>
            </Accordion.Container>
        </Card>
    );
};
