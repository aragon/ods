import type { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import { type ReactNode } from 'react';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

const DisplayComponent: React.FC<{ className?: string; children?: ReactNode }> = ({ className, children }) => (
    <div className={classNames('flex h-40 w-40 items-center justify-center bg-neutral-0', className)}>{children}</div>
);

const meta: Meta<typeof DisplayComponent> = {
    title: 'design-tokens/primitive/Border Radius',
    component: DisplayComponent,
};

type Story = StoryObj<typeof DisplayComponent>;

export const Default: Story = {
    render: () => {
        const tokens = Object.keys(resolveConfig(tailwindConfig).theme?.borderRadius ?? {});

        return (
            <div className="flex space-x-14 bg-transparent text-neutral-800">
                {tokens.map((token) => {
                    const className = `border rounded${token === 'DEFAULT' ? '' : `-${token}`}`;

                    return (
                        <DisplayComponent key={token} className={className}>
                            {token === 'DEFAULT' ? 'rounded (default)' : `rounded-${token}`}
                        </DisplayComponent>
                    );
                })}
            </div>
        );
    },
};

export default meta;
