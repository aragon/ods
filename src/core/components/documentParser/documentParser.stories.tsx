import type { Meta, StoryObj } from '@storybook/react';
import { DocumentParser } from './documentParser';
import TestMdx from './test.mdx';

const meta: Meta<typeof DocumentParser> = {
    title: 'Core/Components/DocumentParser',
    component: DocumentParser,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?node-id=10157-27011&t=RVJHJFTrLMnhgYnJ-4',
        },
    },
};

type Story = StoryObj<typeof DocumentParser>;

/**
 * Default usage example of the DocumentParser component.
 */
export const Default: Story = {
    args: {},
    render: (args) => <DocumentParser {...args}>Hello, world!</DocumentParser>,
};

export const WithMarkdown: Story = {
    args: { content: '# Heading\n\nThis is a *markdown* formatted text' },
    render: (args) => (
        <DocumentParser {...args}>{'# Heading\n\nThis is a *markdown* ~~formatted text~~'}</DocumentParser>
    ),
};

export const WithHTML: Story = {
    args: {},
    render: (args) => (
        <DocumentParser {...args}>
            <h1>HTML Content</h1>
            <p>
                This is <strong>HTML</strong> formatted text.
            </p>
            <del>An image:</del>
            <img src="https://via.placeholder.com/150" alt="Placeholder" />
            <a href="https://example.com">Example link</a>
        </DocumentParser>
    ),
};

export const WithMDXContent: Story = {
    args: {},
    render: (args) => (
        <DocumentParser {...args}>
            <TestMdx />
        </DocumentParser>
    ),
};

export default meta;
