import type { Meta, StoryObj } from '@storybook/react';
import { IconType } from '../icon';
import { Link } from './link';
import { type ILinkProps } from './link.api';

/** bolting on a new prop to the LinkProps type
 * for the purposes of testing the iconRight prop
 * with hardcoded example from design spec
 * while component should be able to accept any icon
 */
type LinkStoryProps = ILinkProps & { showIconRight: boolean };

const meta: Meta<LinkStoryProps> = {
    title: 'components/Link',
    component: Link,
    argTypes: {
        disabled: { control: 'boolean' },
        external: { control: 'boolean' },
        label: { control: 'text' },
        description: { control: 'text' },
        variant: {
            control: { type: 'select', options: ['primary', 'neutral'] },
        },
    },
    args: {
        label: 'Label',
        description: 'Description',
        disabled: false,
        external: true,
        variant: 'primary',
        showIconRight: true,
        href: '#',
    },
};

type Story = StoryObj<LinkStoryProps>;

// can swap out the IconType for any icon in the iconList
export const Primary: Story = {
    args: {
        variant: 'primary',
    },
    render: ({ showIconRight, ...props }) => (
        <Link {...props} iconRight={showIconRight ? IconType.APP_GOVERNANCE : undefined} />
    ),
};

export const Neutral: Story = {
    args: {
        variant: 'neutral',
    },
    render: ({ showIconRight, ...props }) => (
        <Link {...props} iconRight={showIconRight ? IconType.UPPER_RIGHT_ARROW : undefined} />
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: ({ showIconRight, ...props }) => (
        <Link {...props} iconRight={showIconRight ? IconType.UPPER_RIGHT_ARROW : undefined} />
    ),
};

export default meta;
