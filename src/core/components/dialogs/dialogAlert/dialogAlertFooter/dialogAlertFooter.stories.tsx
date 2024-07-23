import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DialogAlert } from '..';
import { Button } from '../../../button';
import { IconType } from '../../../icon';

const meta: Meta<typeof DialogAlert.Footer> = {
    title: 'Core/Components/Dialogs/DialogAlert/DialogAlert.Footer',
    component: DialogAlert.Footer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13584-17263&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof DialogAlert.Footer>;

/**
 * Default usage of the `DialogAlert.Footer` component
 */
export const Default: Story = {
    args: { actionButton: { label: 'Action', iconLeft: IconType.SUCCESS }, cancelButton: { label: 'Cancel' } },
    render: (props) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button variant="primary" onClick={() => setOpen(true)}>
                    Show DialogAlert
                </Button>
                <DialogAlert.Root open={open} onOpenChange={setOpen}>
                    <DialogAlert.Header title="DialogAlert Title" />
                    <DialogAlert.Content>
                        <p>Very important content here!</p>
                    </DialogAlert.Content>
                    <DialogAlert.Footer {...props} />
                </DialogAlert.Root>
            </>
        );
    },
};

export default meta;
