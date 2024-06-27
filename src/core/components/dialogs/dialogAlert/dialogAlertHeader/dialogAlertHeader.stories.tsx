import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DialogAlert } from '..';
import { Button } from '../../../button';

const meta: Meta<typeof DialogAlert.Header> = {
    title: 'Core/Components/Dialogs/DialogAlert/DialogAlert.Header',
    component: DialogAlert.Header,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13558-16969&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlert.Header>;

/**
 * Default usage of the `DialogAlert.Header` component
 */
export const Default: Story = {
    args: { title: 'DialogAlert Title' },
    render: (props) => {
        const [open, setOpen] = useState(false);

        const handleCloseModal = () => {
            setOpen(false);
        };

        return (
            <>
                <Button variant="primary" onClick={() => setOpen(true)}>
                    Show DialogAlert
                </Button>
                <DialogAlert.Root open={open} onOpenChange={setOpen}>
                    <DialogAlert.Header {...props} />
                    <DialogAlert.Content>
                        <p>Very important content here!</p>
                    </DialogAlert.Content>
                    <DialogAlert.Footer
                        actionButton={{ label: 'Action', onClick: handleCloseModal }}
                        cancelButton={{ label: 'Cancel', onClick: handleCloseModal }}
                    />
                </DialogAlert.Root>
            </>
        );
    },
};

export default meta;
