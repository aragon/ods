import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../button';
import { DialogAlertContent } from '../dialogAlertContent';
import { DialogAlertFooter } from '../dialogAlertFooter';
import { DialogAlertRoot } from '../dialogAlertRoot';
import { DialogAlertHeader, type IDialogAlertHeaderProps } from './dialogAlertHeader';

const meta: Meta<typeof DialogAlertHeader> = {
    title: 'components/Dialogs/DialogAlert/DialogAlert.Header',
    component: DialogAlertHeader,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13558-16969&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlertHeader>;

const ControlledComponent = (props: IDialogAlertHeaderProps) => {
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
                <DialogAlertHeader {...props} />
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
 * Default usage of the `DialogAlert.Header` component
 */
export const Default: Story = {
    args: { title: 'DialogAlert Title' },
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
