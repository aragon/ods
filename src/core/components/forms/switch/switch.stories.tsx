import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch, type ISwitchProps } from './switch';

const meta: Meta<typeof Switch> = {
    title: 'Core/Components/Forms/Switch',
    component: Switch,
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
const ControlledComponent = (props: ISwitchProps) => {
    const [checked, setChecked] = useState(false);

    return <Switch checked={checked} onCheckedChanged={setChecked} {...props} />;
};

export const Controlled: Story = {
    render: ({ onCheckedChanged, ...props }: ISwitchProps) => <ControlledComponent {...props} />,
    args: {
        label: 'Show testnets',
        name: 'testnet',
    },
};

export default meta;
