import type { Meta, StoryObj } from '@storybook/react';

import classNames from 'classnames';
import { type ReactNode } from 'react';

const DisplayComponent: React.FC<{ className?: string; children?: ReactNode }> = ({ className, children }) => (
    <div className={classNames('flex h-40 w-40 items-center justify-center bg-neutral-0', className)}>{children}</div>
);

const meta: Meta<typeof DisplayComponent> = {
    title: 'design-tokens/primitive/Shadows',
    component: DisplayComponent,
};

type Story = StoryObj<typeof DisplayComponent>;

export const Default: Story = {
    render: () => (
        <div className="flex space-x-14 bg-transparent text-neutral-800">
            <DisplayComponent className="shadow-sm">shadow-sm</DisplayComponent>
            <DisplayComponent className="shadow">shadow</DisplayComponent>
            <DisplayComponent className="shadow-md">shadow-md</DisplayComponent>
            <DisplayComponent className="shadow-lg">shadow-lg</DisplayComponent>
            <DisplayComponent className="shadow-xl">shadow-xl</DisplayComponent>
            <DisplayComponent className="shadow-2xl">shadow-2xl</DisplayComponent>
        </div>
    ),
};

export default meta;
