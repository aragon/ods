import type { Meta, StoryObj } from '@storybook/react';
import { DocumentParser } from './documentParser';

const meta: Meta<typeof DocumentParser> = {
    title: 'Core/Components/DocumentParser',
    component: DocumentParser,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof DocumentParser>;

export const Default: Story = {
    render: (args) => <DocumentParser {...args}>Hello, world!</DocumentParser>,
};

export const WithMarkdown: Story = {
    render: (args) => (
        <DocumentParser {...args}>{'# Heading\n\nThis is a *markdown* ~~formatted text~~'}</DocumentParser>
    ),
};

export const WithHTML: Story = {
    render: (args) => (
        <DocumentParser {...args}>
            {
                '<h1>HTML Content</h1><p>This is <strong>HTML</strong> formatted text.</p><del>An image:</del><img src="https://via.placeholder.com/150" alt="Placeholder" /><a href="https://example.com">Example link</a>'
            }
        </DocumentParser>
    ),
};

export default meta;
