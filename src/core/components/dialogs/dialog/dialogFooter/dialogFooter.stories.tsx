import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog, type IDialogFooterProps } from '..';
import { Button } from '../../../button';
import { IconType } from '../../../icon';

const meta: Meta<typeof Dialog.Footer> = {
    title: 'Core/Components/Dialogs/Dialog/Dialog.Footer',
    component: Dialog.Footer,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=13584-17263&mode=design&t=9P6frTNZbQcLyeff-4',
        },
    },
};

type Story = StoryObj<typeof Dialog.Footer>;

const ControlledComponent = (props: IDialogFooterProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Show Dialog
            </Button>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Header title="Dialog title" description="Optional dialog description" />
                <Dialog.Content>
                    <p className="py-2 text-neutral-800">Very important content here!</p>
                </Dialog.Content>
                <Dialog.Footer {...props} />
            </Dialog.Root>
        </>
    );
};

/**
 * Default usage of the `Dialog.Footer` component
 */
export const Default: Story = {
    args: {
        primaryAction: { label: 'Action', iconRight: IconType.SUCCESS },
        secondaryAction: { label: 'Cancel' },
        alert: { message: 'Very informative alert message' },
    },
    render: (props) => <ControlledComponent {...props} />,
};

/**
 * `Dialog.Footer` component with no actions
 */
export const Actionless: Story = {
    args: {},
    render: (props) => <ControlledComponent {...props} />,
};

export default meta;
