import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '..';
import { AccordionContainer, type IAccordionContainerProps } from './accordionContainer';

/**
 * Accordion.Container can contain multiple Accordion.Items which comprises an Accordion.Header and its collapsible Accordion.Content.
 */
const meta: Meta<typeof AccordionContainer> = {
    title: 'Core/Components/Accordion/Accordion.Container',
    component: AccordionContainer,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=15855%3A28278&mode=design&t=ssVJeaQ2V7PqQVNj-1',
        },
    },
};

type Story = StoryObj<typeof AccordionContainer>;

const reusableStoryComponent = (props: IAccordionContainerProps, count: number) => (
    <Accordion.Container {...props}>
        {Array.from({ length: count }, (_, index) => (
            <Accordion.Item key={`item-${index + 1}`} value={`item-${index + 1}`}>
                <Accordion.ItemHeader>Accordion Item {index + 1} Header</Accordion.ItemHeader>
                <Accordion.ItemContent>Accordion Item {index + 1} Content</Accordion.ItemContent>
            </Accordion.Item>
        ))}
    </Accordion.Container>
);

/**
 * Default usage example of a full Accordion component.
 */
export const Default: Story = {
    args: {},
    render: (args) => reusableStoryComponent(args, 1),
};

/**
 * Example of an Accordion component implementation with a type of "single" where only one item can be expanded at a time and no defaultValue is set.
 */
export const SingleTypeItems: Story = {
    args: { type: 'single' },
    render: (args) => reusableStoryComponent(args, 3),
};

/**
 * Example of an Accordion component implementation with a type of "multiple" where ['item-2', 'item-3'] is the defaultValue.
 */
export const MultipleTypeItems: Story = {
    args: { type: 'multiple', defaultValue: ['item-2', 'item-3'] },
    render: (args) => reusableStoryComponent(args, 3),
};

export default meta;
