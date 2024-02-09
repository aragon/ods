import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tooltip, type ITooltipProps } from './tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Tooltip>;

/**
 * Default usage example of the `Tooltip` component.
 */
export const Default: Story = {
    args: {
        content: 'Message',
    },
    render: (props) => {
        return (
            <div className="flex h-16 items-end">
                <Tooltip {...props}>
                    <p className="border p-2 text-primary-300">Hover over me!</p>
                </Tooltip>
            </div>
        );
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=12848-9526&mode=design&t=2jQprkV9RMKUhSN3-4',
        },
    },
};

const ControlledComponent = (props: ITooltipProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-16 items-end">
            <Tooltip {...props} open={open} onOpenChange={setOpen}>
                <p className="border p-2 text-primary-300">Hover over me!</p>
            </Tooltip>
        </div>
    );
};

export const Controlled: Story = {
    args: {
        content: 'Message',
    },
    render: (props) => {
        return <ControlledComponent {...props} />;
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=12848-9526&mode=design&t=2jQprkV9RMKUhSN3-4',
        },
    },
};

export default meta;
