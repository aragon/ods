import type { Meta, StoryObj } from '@storybook/react';
import { Link, type ILinkProps } from '.';
import { IconType } from '../icon';

/** bolting on a new prop to the LinkProps type
 * for the purposes of testing the iconRight prop
 * with hardcoded example from design spec
 * while component should be able to accept any icon
 */
type LinkStoryProps = ILinkProps & { showIconRight: boolean };

const meta: Meta<LinkStoryProps> = {
    title: 'components/Link',
    component: Link,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=7958%3A15661&mode=design&t=chS7QmnJNo46KjlP-1',
        },
        docs: {
            description: {
                component: 'Component will auto size text from **14px to 16px** above `md` breakpoint.',
            },
        },
    },
    args: {
        label: 'Label',
        variant: 'primary',
        description: 'Description',
        disabled: false,
        external: true,
        href: '#',
        /** only used for testing the icon right prop */
        showIconRight: true,
    },
    argTypes: {
        iconRight: {
            control: 'select',
            options: Object.values(IconType),
            description: 'Select an icon to display on the right side of the link. Toggle visibility below.',
        },
        showIconRight: {
            description:
                'Toggle to show or hide the icon on the right for visual testing. Not part of the actual component API.',
            control: { type: 'boolean' },
            table: {
                category: 'Visual Testing',
            },
        },
    },
};

type Story = StoryObj<LinkStoryProps>;

// can swap out the IconType for any icon in the iconList
export const Default: Story = {
    args: {
        variant: 'primary',
        iconRight: IconType.UPPER_RIGHT_ARROW,
    },
    render: ({ showIconRight, iconRight, ...props }) => (
        <Link {...props} iconRight={showIconRight ? iconRight : undefined} />
    ),
};

export default meta;
