import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../radioGroup';
import { RadioCard } from './radioCard';

const meta: Meta<typeof RadioCard> = {
    title: 'components/RadioGroup/RadioCard',
    component: RadioCard,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=10095-19157&mode=design&t=FsK7MCOZgi86zSuS-0',
        },
    },
};

type Story = StoryObj<typeof RadioCard>;

export const Default: Story = {
    render: (props) => (
        <RadioGroup>
            <RadioCard {...props} />
        </RadioGroup>
    ),
    args: {
        value: 'value',
        label: 'This is a label',
        description: 'This is the description',
        tag: { label: 'Tag', variant: 'info' },
    },
};

export default meta;
