import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../button';
import { DialogRoot } from '../dialogRoot';
import { DialogHeader, type IDialogHeaderProps } from './dialogHeader';

const meta: Meta<typeof DialogHeader> = {
    title: 'components/Dialogs/Dialog/Dialog.Header',
    component: DialogHeader,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8129-22048&mode=design&t=9f3O4hw9jWtb4fUb-4',
        },
    },
};

type Story = StoryObj<typeof DialogHeader>;

const ControlledComponent = (props: IDialogHeaderProps) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show Dialog
            </Button>
            <DialogRoot open={open} onOpenChange={setOpen}>
                <DialogHeader {...props} />
            </DialogRoot>
        </>
    );
};

/**
 * Default usage of the `DialogAlert.Header` component
 */
export const Default: Story = {
    args: { title: 'Dialog title', description: 'Optional dialog description' },
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
