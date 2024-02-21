import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../button';
import { DialogAlertContent } from './dialogAlertContent/dialogAlertContent';
import { DialogAlertRoot, type IDialogAlertRootProps } from './dialogAlertRoot';
import { DialogAlertTrigger } from './dialogAlertTrigger';

const meta: Meta<typeof DialogAlertRoot> = {
    title: 'components/Dialogs/DialogAlert',
    component: DialogAlertRoot,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13558-17025&mode=design&t=2c10sWNHo18bHNd3-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlertRoot>;

/**
 * Default usage example of DialogAlert component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DialogAlertRoot {...props}>
            <DialogAlertTrigger asChild>
                <Button variant="tertiary">Trigger alert</Button>
            </DialogAlertTrigger>
            <DialogAlertContent
                className="text-neutral-600"
                title="Alert Title"
                actionLabel="Submit"
                cancelLabel="Cancel"
            >
                <p>This is very important content! </p>
            </DialogAlertContent>
        </DialogAlertRoot>
    ),
};
export default meta;

const ControlledComponent = (props: IDialogAlertRootProps) => {
    const [open, setOpen] = useState(false);

    const handleCloseModal = () => setOpen(false);

    return (
        <>
            <Button variant="tertiary" onClick={() => setOpen(true)}>
                Trigger alert
            </Button>
            <DialogAlertRoot {...props} open={open} onOpenChange={handleCloseModal}>
                <DialogAlertContent
                    title="Alert Title"
                    actionLabel="Submit"
                    cancelLabel="Cancel"
                    className="text-neutral-600"
                    onActionClick={handleCloseModal}
                    onCancelClick={handleCloseModal}
                >
                    This is incredibly important content.
                </DialogAlertContent>
            </DialogAlertRoot>
        </>
    );
};
export const Controlled: Story = {
    args: { open: false },
    render: (props) => <ControlledComponent {...props} />,
};
