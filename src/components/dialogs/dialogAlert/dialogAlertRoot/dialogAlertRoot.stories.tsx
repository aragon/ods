import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../button';
import { DialogAlertContent } from '../dialogAlertContent';
import { DialogAlertFooter } from '../dialogAlertFooter';
import { DialogAlertHeader } from '../dialogAlertHeader';
import { DialogAlertRoot } from '../dialogAlertRoot';
import { type IDialogAlertRootProps } from './dialogAlertRoot';

const meta: Meta<typeof DialogAlertRoot> = {
    title: 'components/Dialogs/DialogAlert.Root',
    component: DialogAlertRoot,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13558-17025&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlertRoot>;

const ControlledComponent = (props: IDialogAlertRootProps) => {
    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show DialogAlert
            </Button>
            <DialogAlertRoot open={open} onOpenChange={setOpen} {...props}>
                <DialogAlertHeader title="DialogAlert Title" />
                <DialogAlertContent>
                    <p>Very important content here!</p>
                </DialogAlertContent>
                <DialogAlertFooter
                    actionButton={{ label: 'Action', onClick: handleCloseModal }}
                    cancelButton={{ label: 'Cancel', onClick: handleCloseModal }}
                />
            </DialogAlertRoot>
        </>
    );
};

/**
 * Default usage of the `DialogAlert.Root` component
 */
export const Default: Story = {
    args: {},
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
