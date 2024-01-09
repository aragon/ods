import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
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

export const Default: Story = {
    args: {
        label: 'Show testnets',
        name: 'testnet',
    },
};

export const Controlled: Story = {
    args: {
        label: 'Show testnets',
        defaultChecked: true,
        checked: false,
    },
    render: function Component(args) {
        const [, setArgs] = useArgs();

        const handleCheckedChanged = (checked: boolean) => {
            args.onCheckedChanged?.(checked);
            setArgs({ checked });
        };

        return <Switch {...args} onCheckedChanged={handleCheckedChanged} />;
    },
};

export default meta;
