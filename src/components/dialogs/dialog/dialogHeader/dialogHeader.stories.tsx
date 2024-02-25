import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from '..';
import { Button } from '../../../button';
import { type IDialogHeaderProps } from './dialogHeader';

const meta: Meta<typeof Dialog.Header> = {
    title: 'components/Dialogs/Dialog/Dialog.Header',
    component: Dialog.Header,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8129-22048&mode=design&t=9f3O4hw9jWtb4fUb-4',
        },
    },
};

type Story = StoryObj<typeof Dialog.Header>;

const ControlledComponent = (props: IDialogHeaderProps) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show Dialog
            </Button>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Header {...props} />
            </Dialog.Root>
        </>
    );
};

/**
 * Default usage of the `Dialog.Header` component
 */
export const Default: Story = {
    args: { title: 'Dialog title', description: 'Optional dialog description' },
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
