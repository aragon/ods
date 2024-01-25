import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Progress, type IProgressProps } from '.';

const meta: Meta<typeof Progress> = {
    title: 'components/Progress',
    component: Progress,
    tags: ['autodocs'],
    args: {
        variant: 'default',
    },
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
        variant: 'default',
    },
};

/**
 * Thick usage example of the Progress component.
 */
export const Thick: Story = {
    args: {
        value: 10,
        variant: 'thick',
    },
};

/**
 * Thin usage example of the Progress component.
 */
export const Thin: Story = {
    args: {
        value: 10,
        variant: 'thin',
    },
};

/**
 * Separate functional component for animated progress.
 */
const AnimatedProgress: React.FC<IProgressProps> = ({ variant }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setValue((currentValue) => {
                let newValue = 0;

                if (currentValue !== 100) {
                    const randomValue = Math.random() * 20;
                    newValue = Math.min(100, currentValue + randomValue);
                }

                return newValue;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <Progress value={value} variant={variant} />;
};

/**
 * Animation example of the Progress component with variant control.
 */
export const Animation: Story = {
    render: ({ variant, value }: IProgressProps) => {
        return <AnimatedProgress value={value} variant={variant} />;
    },
};

export default meta;
