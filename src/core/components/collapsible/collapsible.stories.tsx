import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './collapsible';

/**
 * Collapsible component that can wrap any content and visually collapse it for space-saving purposes.
 */
const meta: Meta<typeof Collapsible> = {
    title: 'Core/Components/Collapsible',
    component: Collapsible,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=10157-27011&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof Collapsible>;

/**
 * Default usage example of the Collapsible component.
 */
export const Default: Story = {
    args: { triggerLabelClosed: 'Read more', triggerLabelOpen: 'Read less' },
    render: (args) => (
        <Collapsible {...args}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec
                sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien nec turpis tincidunt
                scelerisque.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien
                nec turpis tincidunt scelerisque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla
                nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.
                Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed ac nulla nec nunc consectetur tincidunt. Nulla facilisi. Nullam nec
                sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam nec sapien nec turpis tincidunt
                scelerisque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla nec nunc consectetur
                tincidunt. Nulla facilisi. Nullam nec sapien nec turpis tincidunt scelerisque. Nulla facilisi. Nullam
                nec sapien nec turpis tincidunt scelerisque.
            </p>
        </Collapsible>
    ),
};

export const WithImage: Story = {
    args: {
        triggerLabelClosed: 'See more',
        triggerLabelOpen: 'See less',
    },
    render: (args) => (
        <Collapsible {...args}>
            <img
                src="https://source.unsplash.com/800x600/?landscape"
                alt="A beautiful landscape"
                className="h-auto w-full"
            />
        </Collapsible>
    ),
};

export default meta;
