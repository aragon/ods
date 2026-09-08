import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../button';
import { Dialog } from '../dialogs';
import { Radio, RadioGroup } from '../forms';
import { AddressOutput } from './addressOutput';

const meta: Meta<typeof AddressOutput> = {
    title: 'Core/Components/AddressOutput',
    component: AddressOutput,
    argTypes: {
        address: {
            control: 'text',
            description: 'Address to display, always the source of truth of the component.',
        },
        label: {
            control: 'text',
            description: 'Display label for the address, e.g. an ENS name. Defaults to the truncated address.',
        },
        showCompleteAddress: {
            control: 'boolean',
            description:
                'Renders the full checksummed address instead of the truncated one. Ignored when label is set.',
        },
        href: {
            control: 'text',
            description:
                'URL the label links to, typically a block explorer. A truthy value marks the address as link-like: tap navigates instead of opening the reveal and the copy control turns primary.',
        },
        isExternal: {
            control: 'boolean',
            description: 'Whether the href link is external (new tab + arrow). Set false for in-app navigation.',
        },
        copy: {
            control: 'boolean',
            description: 'Renders an inline copy control that copies the full checksummed address.',
        },
        reveal: {
            control: 'boolean',
            description: 'Reveals the full checksummed address on hover, keyboard focus and tap.',
        },
    },
};

type Story = StoryObj<typeof AddressOutput>;

const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';

/**
 * Default usage. `reveal` and `copy` are on by default: the full checksummed address is revealed on hover,
 * keyboard focus and tap, with an inline copy control.
 */
export const Default: Story = {
    args: { address },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * The label stays the display only; the reveal shows the same checksummed address whatever the label is.
 */
export const WithLabel: Story = {
    args: { address, label: 'vitalik.eth' },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * Escape hatch that renders the full checksummed address instead of the truncated one.
 */
export const Full: Story = {
    args: { address, showCompleteAddress: true },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * With `href`, the label is rendered as an external explorer link, so a tap keeps navigating. The reveal then only
 * opens on hover and keyboard focus, and the copy control turns primary to match the link.
 */
export const Link: Story = {
    args: { address, href: `https://etherscan.io/address/${address}` },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * Flags can be turned off independently.
 */
export const PlainText: Story = {
    args: { address, copy: false, reveal: false },
    render: (props) => (
        <div className="flex h-20 items-end">
            <AddressOutput {...props} />
        </div>
    ),
};

/**
 * Reproduces the reveal opening on its own when the component sits inside a dialog.
 *
 * A dialog moves focus into its content on open: Radix's `FocusScope` focuses the first tabbable element it finds,
 * skipping links, and a Radix tooltip trigger opens instantly on focus without telling programmatic focus apart from
 * a keyboard `Tab`. So whenever the dialog's first tabbable element is one of the tooltip triggers this component
 * renders, that tooltip is already open when the dialog appears.
 *
 * Pick a layout and open the dialog with the mouse only:
 *
 * - `address` — the reveal button is first, so the checksummed address is revealed on open.
 * - `link` — the reveal trigger is a link and gets skipped, so the `Copy` tooltip opens instead.
 * - `close button` / `preceding button` — focus lands elsewhere and no tooltip opens, which is the correct behaviour.
 */
export const InsideDialog: Story = {
    args: { address },
    render: (props) => {
        const [layout, setLayout] = useState('address');
        const [open, setOpen] = useState(false);

        const closeDialog = () => setOpen(false);

        return (
            <div className="flex flex-col items-start gap-4">
                <RadioGroup
                    className="md:grid md:grid-cols-2"
                    label="First tabbable element of the dialog"
                    onValueChange={setLayout}
                    value={layout}
                >
                    <Radio label="Address reveal button" value="address" />
                    <Radio label="Address rendered as a link" value="link" />
                    <Radio label="Header close button" value="close-button" />
                    <Radio label="A preceding button" value="preceding-button" />
                </RadioGroup>
                <Button onClick={() => setOpen(true)} variant="primary">
                    Open dialog
                </Button>
                <Dialog.Root onOpenChange={setOpen} open={open}>
                    <Dialog.Header
                        onClose={layout === 'close-button' ? closeDialog : undefined}
                        title="Address details"
                    />
                    <Dialog.Content className="flex flex-col items-start gap-4 pb-4 md:pb-6">
                        {layout === 'preceding-button' && <Button variant="secondary">Focused on open</Button>}
                        <AddressOutput
                            {...props}
                            href={layout === 'link' ? `https://etherscan.io/address/${props.address}` : undefined}
                        />
                    </Dialog.Content>
                </Dialog.Root>
            </div>
        );
    },
};

export default meta;
