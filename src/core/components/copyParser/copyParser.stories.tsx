import type { Meta, StoryObj } from '@storybook/react';
import { CopyParser } from './copyParser';
import TestMdx from './test.mdx';

const meta: Meta<typeof CopyParser> = {
    title: 'Core/Components/CopyParser',
    component: CopyParser,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=10157-27011&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof CopyParser>;

/**
 * Default usage example of the CopyParser component.
 */
export const Default: Story = {
    render: (args) => <CopyParser {...args}>Hello, world!</CopyParser>,
};

export const WithMarkdown: Story = {
    args: {
        content: '# Heading\n\nThis is a *markdown* formatted text.',
    },
    render: (args) => <CopyParser {...args} />,
};

export const WithHTML: Story = {
    args: {
        content: '<h1>HTML Content</h1><p>This is <strong>HTML</strong> formatted text.</p>',
    },
    render: (args) => <CopyParser {...args} />,
};

export const WithMDXContent: Story = {
    args: {
        children: <TestMdx />,
    },
    render: (args) => <CopyParser {...args} />,
};

export default meta;
