import type { Meta, StoryObj } from '@storybook/react';
import { DocumentParser } from './documentParser';

const meta: Meta<typeof DocumentParser> = {
    title: 'Core/Components/DocumentParser',
    component: DocumentParser,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof DocumentParser>;

export const Default: Story = {
    args: {
        stringDocument: '<p>Hello, world!</p>',
    },
    render: (args) => <DocumentParser {...args} />,
};

export const WithMarkdown: Story = {
    args: {
        stringDocument:
            '# Markdown Heading\n\nThis is a *markdown* ~~formatted text~~ <pre>onClick(()=>void);</pre> <pre><code class="language-javascript">const foo = "bar";</code></pre>',
    },
    render: (args) => <DocumentParser {...args} />,
};

export const WithHTML: Story = {
    args: {
        stringDocument:
            '<h1>HTML Heading</h1><p>This is a <strong>HTML</strong> <del>formatted text</del> <pre>onClick(()=>void);</pre> <pre><code class="language-javascript">const foo = "bar";</code></pre></p>',
    },
    render: (args) => <DocumentParser {...args} />,
};

export default meta;
