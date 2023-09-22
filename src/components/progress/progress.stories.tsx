import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
    title: 'components/Progress',
    component: Progress,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=445-5321&mode=design&t=Uyx4LVxxahHwn8mg-4',
        },
    },
};

type Story = StoryObj<typeof Progress>;

/**
 * Default usage example of the Progress component.
 */
export const Default: Story = {
    args: {
        value: 10,
    },
};

export const Animation = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setValue((currentValue) => {
                let newValue = 0;

                if (currentValue !== 100) {
                    const randomValue = Math.random() * 20;
                    newValue = Math.min(100, currentValue + randomValue);
                }

                return newValue;
            });
        }, 1000);
    }, []);

    return <Progress value={value} />;
};

export default meta;
