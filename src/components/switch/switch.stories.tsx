import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
    title: 'components/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?node-id=8850%3A12962&mode=dev',
        },
    },
};

type Story = StoryObj<typeof Switch>;

/**
 * `Switch` used as an uncontrolled component
 */
export const Uncontrolled: Story = {
    args: {
        label: 'Show testnets',
        name: 'testnet',
        defaultChecked: true,
        onCheckedChanged: undefined,
    },
};

/**
 * Controlled usage of the `Switch` component
 */
export const Controlled: Story = {
    decorators: [
        (Story) => {
            const [checked, setChecked] = useState(false);

            const handleCheckedChanged = (newValue: boolean) => {
                setChecked(newValue);
            };

            return <Story checked={checked} onCheckedChanged={handleCheckedChanged} />;
        },
    ],

    args: {
        label: 'Show testnets',
        name: 'testnet',
    },

    render: function Component(args) {
        const [, setArgs] = useArgs();

        const handleCheckedChanged = (newValue: boolean) => {
            args.onCheckedChanged?.(newValue);
            setArgs({ checked: newValue });
        };
        return <Switch {...args} onCheckedChanged={handleCheckedChanged} />;
    },
};

export default meta;
