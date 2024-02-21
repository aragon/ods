import type { Meta, StoryObj } from '@storybook/react';
import { DialogAlertRoot } from '../dialogAlertRoot';
import { DialogAlertTrigger } from '../dialogAlertTrigger';
import { DialogAlertContent } from './dialogAlertContent';

const meta: Meta<typeof DialogAlertContent> = {
    title: 'components/Dialogs/DialogAlertContent',
    component: DialogAlertContent,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13558-17025&mode=design&t=2c10sWNHo18bHNd3-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlertContent>;

/**
 * Default usage of the `DialogAlertContent` component
 */
export const Default: Story = {
    args: {
        title: 'Alert Title',
        actionLabel: 'Action',
        cancelLabel: 'Cancel',
    },
    render: (props) => (
        <DialogAlertRoot>
            <DialogAlertTrigger>Trigger alert</DialogAlertTrigger>
            <DialogAlertContent {...props}>
                <p>This is an alert!</p>
            </DialogAlertContent>
        </DialogAlertRoot>
    ),
};

/**
 * Usage example of DialogAlertContent component with overflowing content
 */
export const ScrollableContent: Story = {
    args: {
        title: 'Alert Title',
        variant: 'critical',
        actionLabel: 'Action',
        cancelLabel: 'Cancel',
        className: 'text-neutral-600',
    },
    render: (props) => (
        <DialogAlertRoot>
            <DialogAlertTrigger>Trigger alert</DialogAlertTrigger>
            <DialogAlertContent {...props}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in aliquet nibh. Vestibulum
                    pellentesque urna eget aliquam tristique. Proin justo nisl, suscipit ac aliquet et, congue id enim.
                    Quisque sed lacinia nulla. Nullam cursus eros quis sapien lobortis, pulvinar laoreet ipsum ornare.
                    Nullam condimentum molestie nunc vel iaculis. Cras dignissim libero et efficitur rhoncus. Donec ut
                    turpis enim. Vestibulum cursus mollis turpis et vehicula. In sit amet odio metus. Morbi elementum
                    leo sit amet sagittis ullamcorper. Nulla pellentesque odio vel mi dignissim sodales. Vestibulum ante
                    ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur venenatis interdum
                    dolor nec blandit. Fusce eu leo non dolor convallis porttitor. Pellentesque feugiat tincidunt
                    iaculis.
                </p>
            </DialogAlertContent>
        </DialogAlertRoot>
    ),
};
export default meta;
