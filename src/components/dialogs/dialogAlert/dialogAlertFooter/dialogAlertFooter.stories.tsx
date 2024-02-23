import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../button';
import { IconType } from '../../../icon';
import { DialogAlertContent } from '../dialogAlertContent';
import { DialogAlertHeader } from '../dialogAlertHeader';
import { DialogAlertRoot } from '../dialogAlertRoot';
import { DialogAlertFooter, type IDialogAlertFooterProps } from './dialogAlertFooter';

const meta: Meta<typeof DialogAlertFooter> = {
    title: 'components/Dialogs/DialogAlert/DialogAlert.Footer',
    component: DialogAlertFooter,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13584-17263&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlertFooter>;

const ControlledComponent = (props: IDialogAlertFooterProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show DialogAlert
            </Button>
            <DialogAlertRoot open={open} onOpenChange={setOpen}>
                <DialogAlertHeader title="DialogAlert Title" />
                <DialogAlertContent>
                    <p>Very important content here!</p>
                </DialogAlertContent>
                <DialogAlertFooter {...props} />
            </DialogAlertRoot>
        </>
    );
};

/**
 * Default usage of the `DialogAlert.Footer` component
 */
export const Default: Story = {
    args: { actionButton: { label: 'Action', iconRight: IconType.SUCCESS }, cancelButton: { label: 'Cancel' } },
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
