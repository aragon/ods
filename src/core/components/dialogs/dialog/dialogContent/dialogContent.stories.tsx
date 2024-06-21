import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from '..';
import { Button } from '../../../button';
import { type IDialogContentProps } from './dialogContent';

const meta: Meta<typeof Dialog.Content> = {
    title: 'Core/Components/Dialogs/Dialog/Dialog.Content',
    component: Dialog.Content,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8129-22048&mode=design&t=9f3O4hw9jWtb4fUb-4',
        },
    },
};

type Story = StoryObj<typeof Dialog.Content>;

const ControlledComponent = (props: IDialogContentProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show Dialog
            </Button>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Header title="Dialog title" description="Optional dialog description" />
                <Dialog.Content {...props} />
                <Dialog.Footer
                    primaryAction={{ label: 'Primary action' }}
                    secondaryAction={{ label: 'Secondary action' }}
                    alert={{ message: 'Very informative alert message' }}
                />
            </Dialog.Root>
        </>
    );
};

/**
 * Default usage of the `Dialog.Content` component
 */
export const Default: Story = {
    args: {
        children: <p className="py-2 text-neutral-800">Very important content here!</p>,
    },
    render: (props) => <ControlledComponent {...props} />,
};

/**
 * Usage example of `Dialog.Content` component with overflowing content
 */
export const ScrollableContent: Story = {
    args: {
        children: (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in aliquet nibh. Vestibulum pellentesque
                urna eget aliquam tristique. Proin justo nisl, suscipit ac aliquet et, congue id enim. Quisque sed
                lacinia nulla. Nullam cursus eros quis sapien lobortis, pulvinar laoreet ipsum ornare. Nullam
                condimentum molestie nunc vel iaculis. Cras dignissim libero et efficitur rhoncus. Donec ut turpis enim.
                Vestibulum cursus mollis turpis et vehicula. In sit amet odio metus. Morbi elementum leo sit amet
                sagittis ullamcorper. Nulla pellentesque odio vel mi dignissim sodales. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia curae; Curabitur venenatis interdum dolor nec blandit.
                Fusce eu leo non dolor convallis porttitor. Pellentesque feugiat tincidunt iaculis. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Nulla in aliquet nibh. Vestibulum pellentesque urna eget aliquam
                tristique. Proin justo nisl, suscipit ac aliquet et, congue id enim. Quisque sed lacinia nulla. Nullam
                cursus eros quis sapien lobortis, pulvinar laoreet ipsum ornare. Nullam condimentum molestie nunc vel
                iaculis. Cras dignissim libero et efficitur rhoncus. Donec ut turpis enim. Vestibulum cursus mollis
                turpis et vehicula. In sit amet odio metus. Morbi elementum leo sit amet sagittis ullamcorper. Nulla
                pellentesque odio vel mi dignissim sodales. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia curae; Curabitur venenatis interdum dolor nec blandit. Fusce eu leo non dolor
                convallis porttitor. Pellentesque feugiat tincidunt iaculis.
            </p>
        ),
    },
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
