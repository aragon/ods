import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '..';
import { AccordionContainer } from './accordionContainer';

/**
 * Accordion can contain multiple Accordion.Items that can be expanded or collapsed one at a time.
 */
const meta: Meta<typeof AccordionContainer> = {
    title: 'Core/Components/Accordion',
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

/**
 * Default usage example of Accordion component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <Accordion.Container {...props}>
            <Accordion.Item value="item-1">
                <Accordion.ItemHeader>Accordion Item 1</Accordion.ItemHeader>
                <Accordion.ItemContent>Accordion Item 1 Content</Accordion.ItemContent>
            </Accordion.Item>
        </Accordion.Container>
    ),
};

/**
 * Example of Accordion component with multiple items.
 */
export const MultipleItems: Story = {
    render: () => {
        const mockItems = [
            { header: 'Accordion Item 1 Header', content: 'Accordion Item 1 Content' },
            { header: 'Accordion Item 2 Header', content: 'Accordion Item 2 Content' },
            { header: 'Accordion Item 3 Header', content: 'Accordion Item 3 Content' },
        ];
        return (
            <Accordion.Container>
                {mockItems.map((item, index) => (
                    <Accordion.Item key={`item-${index + 1}`} value={`item-${index + 1}`}>
                        <Accordion.ItemHeader>{item.header}</Accordion.ItemHeader>
                        <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Container>
        );
    },
};

export default meta;
