import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
    title: 'components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        href: { control: 'text' },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=7980-15610&mode=design&t=GaPykW52ajbQx2r7-4',
        },
    },
};

type Story = StoryObj<typeof Button>;

/**
 * Default usage example of the Button component.
 */
export const Default: Story = {
    args: {
        variant: 'primary',
        size: 'lg',
        children: 'Button label',
        onClick: () => alert('click'),
    },
};

/**
 * The Button component renders a <a /> tag when the href property is set.
 */
export const Link: Story = {
    args: {
        variant: 'primary',
        size: 'lg',
        children: 'Link label',
        onClick: () => alert('click'),
        href: 'https://www.google.com',
        target: '_blank',
    },
};

/**
 * Button component with a size that changes depending on the current breakpoint.
 */
export const ResponsiveButton: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        responsiveSize: { xl: 'lg' },
        children: 'Responsive button',
    },
};

export default meta;
