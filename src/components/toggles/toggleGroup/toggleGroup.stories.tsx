import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from '../toggle';
import { ToggleGroup } from './toggleGroup';
import { type IToggleGroupProps } from './toggleGroup.api';

const meta: Meta<typeof Toggle> = {
    title: 'components/Toggles/ToggleGroup',
    component: Toggle,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=9778-14&mode=design&t=eAkFH3nzSllOw9zp-4',
        },
    },
};

type Story = StoryObj<typeof ToggleGroup>;

const DefaultComponent = (props: Omit<IToggleGroupProps, 'value' | 'onChange'>) => {
    const [value, setValue] = useState<string>();

    const handleChange = (value: string | undefined) => setValue(value);

    return (
        <ToggleGroup value={value} onChange={handleChange} {...props}>
            <Toggle value="ethereum" label="Ethereum" />
            <Toggle value="polygon" label="Polygon" />
            <Toggle value="base" label="Base" />
        </ToggleGroup>
    );
};

/**
 * Default usage example of the ToggleGroup component.
 */
export const Default: Story = {
    render: ({ value, onChange, ...props }) => <DefaultComponent {...props} />,
};

const MultiSelectComponent = (props: Omit<IToggleGroupProps, 'value' | 'onChange'>) => {
    const [value, setValue] = useState<string[]>();

    const handleChange = (value: string[] | undefined) => setValue(value);

    return (
        <ToggleGroup isMultiSelect={true} value={value} onChange={handleChange} {...props}>
            <Toggle value="ethereum" label="Ethereum" />
            <Toggle value="polygon" label="Polygon" />
            <Toggle value="base" label="Base" />
        </ToggleGroup>
    );
};

/**
 * ToggleGroup component used with multiple selection.
 */
export const MultiSelect: Story = {
    render: ({ value, onChange, ...props }) => <MultiSelectComponent {...props} />,
};

export default meta;
