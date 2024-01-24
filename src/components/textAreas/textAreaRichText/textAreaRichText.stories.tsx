import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaRichText, type ITextAreaRichTextProps } from './textAreaRichText';

const meta: Meta<typeof TextAreaRichText> = {
    title: 'components/TextAreas/TextAreaRichText',
    component: TextAreaRichText,
    tags: ['autodocs'],
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
        placeholder: 'Uncontrolled input',
    },
};

const ControlledComponent = (props: ITextAreaRichTextProps) => {
    return <TextAreaRichText {...props} />;
};

/**
 * Usage example of a controlled TextAreaRichText component.
 */
export const Controlled: Story = {
    render: (props) => <ControlledComponent {...props} />,
    args: {
        placeholder: 'Controlled input',
    },
};

export default meta;
