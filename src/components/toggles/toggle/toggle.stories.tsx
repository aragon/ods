import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToggleGroup } from '../toggleGroup';
import { Toggle, type IToggleProps } from './toggle';

const meta: Meta<typeof Toggle> = {
    title: 'components/Toggles/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=9778-14&mode=design&t=eAkFH3nzSllOw9zp-4',
        },
    },
};

type Story = StoryObj<typeof Toggle>;

const ToggleComponent = (props: IToggleProps) => {
    const [value, setValue] = useState<string>();

    return (
        <ToggleGroup value={value} onChange={setValue}>
            <Toggle {...props} />
        </ToggleGroup>
    );
};

/**
 * Default usage example of the Toggle component.
 */
export const Default: Story = {
    render: (props) => <ToggleComponent {...props} />,
    args: {
        value: 'value',
        label: 'Label',
    },
};

/**
 * Disabled Toggle component.
 */
export const Disabled: Story = {
    render: (props) => <ToggleComponent {...props} />,
    args: {
        disabled: true,
        label: 'Disabled',
    },
};

export default meta;
