import type { Meta, StoryObj } from '@storybook/react';
import { LINK_VARIANTS, Link, type IconProps, type LinkProps } from './link';

const CircleIcon: React.FC<IconProps> = ({ height = 24, width = 24, ...props }) => (
    <svg height={height} width={width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const LinkTemplate: React.FC<LinkIconStoryArgs> = ({ withIcon, ...args }) => (
    <Link {...args} iconRight={withIcon ? <CircleIcon /> : undefined} />
);

type LinkIconStoryArgs = LinkProps & {
    withIcon?: boolean;
};

const meta: Meta<LinkIconStoryArgs> = {
    title: 'components/Link',
    component: Link,
    argTypes: {
        disabled: { control: 'boolean', defaultValue: false },
        external: { control: 'boolean', defaultValue: false },
        label: { control: 'text' },
        description: { control: 'text' },
        type: {
            control: { type: 'select', options: LINK_VARIANTS },
        },
        withIcon: {
            control: 'boolean',
            name: 'With Icon',
            defaultValue: false,
        },
    },
};

type Story = StoryObj<LinkProps>;

export const Primary: Story = {
    args: {
        label: 'Primary Link',
        type: 'primary',
        href: 'https://app.aragon.org',
    },
    render: (args) => <LinkTemplate {...args} />,
};

export const Neutral: Story = {
    args: {
        label: 'Neutral Link',
        type: 'neutral',
    },
    render: (args) => <LinkTemplate {...args} />,
};

export const Inverted: Story = {
    args: {
        label: 'Inverted Link',
        type: 'inverted',
    },
    render: (args) => <LinkTemplate {...args} />,
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Link',
        disabled: true,
    },
    render: (args) => <LinkTemplate {...args} />,
};

export const WithDescription: Story = {
    args: {
        label: 'Link with Description',
        description: 'This is a link with a description',
    },
    render: (args) => <LinkTemplate {...args} />,
};

export const External: Story = {
    args: {
        label: 'External Link',
        external: true,
        href: 'https://app.aragon.org',
    },
    render: (args) => <LinkTemplate {...args} />,
};

export const WithIcon: Story = {
    args: {
        label: 'Link with Icon',
        iconRight: <CircleIcon />,
        href: '#',
    },
    render: (args) => <LinkTemplate {...args} />,
};

export default meta;
