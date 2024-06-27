import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TextAreaRichText } from './textAreaRichText';

const meta: Meta<typeof TextAreaRichText> = {
    title: 'Core/Components/Forms/TextAreaRichText',
    component: TextAreaRichText,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=10095-8687&mode=design&t=RRfZug69k5JnpYXM-4',
        },
    },
};

type Story = StoryObj<typeof TextAreaRichText>;

/**
 * Default uncontrolled usage example of the TextAreaRichText component.
 */
export const Default: Story = {
    args: {
        placeholder: 'Placeholder',
    },
};

/**
 * Usage example of a controlled TextAreaRichText component.
 */
export const Controlled: Story = {
    render: ({ onChange, ...props }) => {
        const [value, setValue] = useState(
            '<p>Hello <strong>dev</strong>, check this <a href="https://aragon.org" target="_blank">link</a>.</p>',
        );

        return <TextAreaRichText value={value} onChange={setValue} {...props} />;
    },
};

export default meta;
