import classNames from 'classnames';
import { cloneElement, isValidElement, useState, type ReactElement } from 'react';
import { Accordion, Button, Card, Heading, type IAccordionContainerBaseProps } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { type IProposalActionsActionProps } from '../proposalActionsAction';

export interface IProposalActionsContainerProps extends Omit<IAccordionContainerBaseProps<true>, 'isMulti'> {
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
    const { className, children } = props;
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const { copy } = useOdsModulesContext();

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
                {copy.proposalActionsContainer.containerName}
            </Heading>
            <Accordion.Container isMulti={true} value={expandedItems} onValueChange={handleAccordionValueChange}>
                {renderChildren()}
                <div className="mt-1 flex w-full flex-col gap-y-3 overflow-hidden px-4 pb-4 md:flex-row-reverse md:gap-x-6 md:px-6 md:pb-6">
                    {childrenCount > 1 && (
                        <Button onClick={handleToggleAll} variant="tertiary" size="md" className="shrink-0 md:w-fit">
                            {expandedItems.length === childrenCount
                                ? copy.proposalActionsContainer.collapse
                                : copy.proposalActionsContainer.expand}
                        </Button>
                    )}
                    {/** TODO: button cluster logic for states and tx responses **/}
                    {/** TODO: needs logic for clearing message as more buttons become available (execute, etc) **/}
                    <p className="w-full text-center text-sm text-neutral-500 md:text-start">
                        {copy.proposalActionsContainer.footerMessage}
                    </p>
                </div>
            </Accordion.Container>
        </Card>
    );
};
