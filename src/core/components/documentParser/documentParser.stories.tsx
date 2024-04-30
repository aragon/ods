import type { Meta, StoryObj } from '@storybook/react';
import { DocumentParser } from './documentParser';

/**
 * DocumentParser component is used to render HTML or Markdown content in a read-only format.
 */
const meta: Meta<typeof DocumentParser> = {
    title: 'Core/Components/DocumentParser',
    component: DocumentParser,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof DocumentParser>;

/**
 * Default use case for the DocumentParser component with a basic string.
 */
export const Default: Story = {
    args: {
        stringDocument: 'Hello, world!',
    },
    render: (args) => <DocumentParser {...args} />,
};

/**
 * DocumentParser component with markdown content, including a code block formatted correctly without unintended indentation, and an image.
 */
export const WithMarkdown: Story = {
    args: {
        stringDocument: `# Markdown Heading

This is a **markdown** ~~formatted text~~ with \`inline code\`.

- Markdown *list item 1*
    - Markdown _sublist item 2_

\`\`\`javascript
const x = 10;
\`\`\`

![Sample Image](https://via.placeholder.com/150x150)
`,
    },
    render: (args) => <DocumentParser {...args} />,
};

/**
 * DocumentParser component with HTML content, matched to Markdown including sublist and an image.
 */
export const WithHTML: Story = {
    args: {
        stringDocument: `
<h1>HTML Heading</h1>
<p>This is a <strong>HTML</strong> <del>formatted text</del> with <code>inline code</code>.</p>
<ul>
    <li>HTML <em>list item 1</em>
        <ul>
            <li>HTML <em>sublist item 2</em></li>
        </ul>
    </li>
</ul>
<pre><code>const x = 10;</code></pre>
<img src="https://via.placeholder.com/150x150" alt="Sample Image">
`,
    },
    render: (args) => <DocumentParser {...args} />,
};

/**
 * DocumentParser component with mixed Markdown and HTML content.
 */
export const WithMixedContent: Story = {
    args: {
        stringDocument: `
# Heading in Markdown

This is a paragraph in **Markdown** with some *emphasis*.

<!-- HTML tags -->
<div style="color: blue;">This line is styled with HTML <strong>strong</strong> and uses a <em>Markdown</em> tag.</div>

<code><pre>const x = 10;</pre></code>

<blockquote>
    This is a blockquote in HTML.
    <p>This is a paragraph within the blockquote.</p>
</blockquote>

- Markdown list item 1
- Markdown list item 2
`,
    },
    render: (args) => <DocumentParser {...args} />,
};

export default meta;
