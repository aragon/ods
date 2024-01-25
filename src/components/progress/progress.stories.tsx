import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Progress, type IProgressProps } from '.';

const meta: Meta<typeof Progress> = {
    title: 'components/Progress',
    component: Progress,
    tags: ['autodocs'],
    args: {
        size: 'md',
    },
    argTypes: {
        value: {
            control: false,
        },
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
 * Separate functional component for animated progress.
 */
const AnimatedProgress: React.FC<IProgressProps> = ({ value, ...otherProps }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentValue((prevValue) => {
                if (prevValue >= 100) {
                    return prevValue;
                }
                const increment = Math.random() * 20;
                return Math.min(prevValue + increment, 100);
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <Progress value={currentValue} {...otherProps} />;
};

/**
 * Animation example of the Progress component with variant control.
 */
export const Animation: Story = {
    render: (props) => {
        return <AnimatedProgress {...props} />;
    },
};

export default meta;
