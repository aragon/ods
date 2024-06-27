import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from '..';
import { Button } from '../../../button';

const meta: Meta<typeof Dialog.Header> = {
    title: 'Core/Components/Dialogs/Dialog/Dialog.Header',
    component: Dialog.Header,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=8129-22048&mode=design&t=9f3O4hw9jWtb4fUb-4',
        },
    },
};

type Story = StoryObj<typeof Dialog.Header>;

/**
 * Default usage of the `Dialog.Header` component
 */
export const Default: Story = {
    args: { title: 'Dialog title', description: 'Optional dialog description' },
    render: (props) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button variant="primary" onClick={() => setOpen(true)}>
                    Show Dialog
                </Button>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Header {...props} />
                    <Dialog.Content>
                        <p className="py-2 text-neutral-800">Very important content here!</p>
                    </Dialog.Content>
                    <Dialog.Footer
                        primaryAction={{ label: 'Primary action' }}
                        secondaryAction={{ label: 'Secondary action' }}
                        alert={{ message: 'Very informative alert message' }}
                    />
                </Dialog.Root>
            </>
        );
    },
};

export default meta;
