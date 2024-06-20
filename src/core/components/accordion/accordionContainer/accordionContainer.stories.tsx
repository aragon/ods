import type { Meta, StoryObj } from '@storybook/react';
import { type RefAttributes } from 'react';
import { Accordion, type IAccordionContainerProps } from '..';

/**
 * Accordion.Container can contain multiple Accordion.Items which comprises an Accordion.Header and its collapsible Accordion.Content.
 */
const meta: Meta<typeof Accordion.Container> = {
    title: 'Core/Components/Accordion/Accordion.Container',
    component: Accordion.Container,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=15855%3A28278&mode=design&t=ssVJeaQ2V7PqQVNj-1',
        },
    },
};

type Story = StoryObj<typeof Accordion.Container>;

const reusableStoryComponent = (props: IAccordionContainerProps & RefAttributes<HTMLDivElement>, count: number) => {
    return (
        <Accordion.Container {...props}>
            {Array.from({ length: count }, (_, index) => (
                <Accordion.Item key={`item-${index + 1}`} value={`item-${index + 1}`}>
                    <Accordion.ItemHeader>Item {index + 1} Header</Accordion.ItemHeader>
                    <Accordion.ItemContent>
                        <div className="flex h-24 w-full items-center justify-center border border-dashed border-info-300 bg-info-100">
                            Item {index + 1} Content
                        </div>
                    </Accordion.ItemContent>
                </Accordion.Item>
            ))}
        </Accordion.Container>
    );
};
/**
 * Default usage example of a full Accordion component.
 */
export const Default: Story = {
    args: { isMulti: false },
    render: (args) => reusableStoryComponent(args as IAccordionContainerProps & RefAttributes<HTMLDivElement>, 1),
};

/**
 * Example of an Accordion component implementation with a type of "single" and no defaultValue is set.
 */
export const SingleTypeItems: Story = {
    args: { isMulti: false },
    render: (args) => reusableStoryComponent(args as IAccordionContainerProps & RefAttributes<HTMLDivElement>, 3),
};

/**
 * Example of an Accordion component implementation with a type of "multiple" where the second and third items have been set as the defaultValue.
 */
export const MultipleTypeItems: Story = {
    args: { isMulti: true, defaultValue: ['item-2', 'item-3'] },
    render: (args) => reusableStoryComponent(args as IAccordionContainerProps & RefAttributes<HTMLDivElement>, 3),
};

export default meta;
