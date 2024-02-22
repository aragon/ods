import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../button';
import { DialogAlertFooter } from '../dialogAlertFooter';
import { DialogAlertHeader } from '../dialogAlertHeader';
import { DialogAlertRoot } from '../dialogAlertRoot';
import { DialogAlertContent, type IDialogAlertContentProps } from './dialogAlertContent';

const meta: Meta<typeof DialogAlertContent> = {
    title: 'components/Dialogs/DialogAlert.Content',
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

const ControlledComponent = (props: IDialogAlertContentProps) => {
    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show DialogAlert
            </Button>
            <DialogAlertRoot open={open} onOpenChange={setOpen}>
                <DialogAlertHeader title="DialogAlert Title" />
                <DialogAlertContent {...props} />
                <DialogAlertFooter
                    actionButton={{ label: 'Action', onClick: handleCloseModal }}
                    cancelButton={{ label: 'Cancel', onClick: handleCloseModal }}
                />
            </DialogAlertRoot>
        </>
    );
};

/**
 * Default usage of the `DialogAlert.Content` component
 */
export const Default: Story = {
    args: {
        children: <p>Very important content here!</p>,
    },
    render: (props) => <ControlledComponent {...props} />,
};

/**
 * Usage example of `DialogAlert.Content` component with overflowing content
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
                Fusce eu leo non dolor convallis porttitor. Pellentesque feugiat tincidunt iaculis.
            </p>
        ),
    },
    render: (props) => <ControlledComponent {...props} />,
};
export default meta;
