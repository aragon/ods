import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { useEffect, useState } from 'react';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

function pxToRem(px: number, baseSize = 16) {
    return px / baseSize;
}

interface IDisplayComponent {
    name: string;
    sizePx: number;
    sizeRem: number;
    value: string;
}
const DisplayComponent: React.FC<IDisplayComponent> = ({ name, value, sizePx, sizeRem }) => {
    return (
        <tr>
            <td className="border-b px-4 py-2">{name}</td>
            <td className="border-b px-4 py-2">{`${sizeRem}${sizeRem === 1 || sizeRem === 0 ? 'px' : 'rem'}`}</td>
            <td className="border-b px-4 py-2">{`${sizePx}px`}</td>
            <td className="border-b px-4 py-2">
                <div style={{ width: value }} className="h-6 bg-cyan-300" />
            </td>
        </tr>
    );
};

const meta: Meta<typeof DisplayComponent> = {
    title: 'design-tokens/primitive/Spacing',
    component: DisplayComponent,
};

type Story = StoryObj<typeof DisplayComponent>;

const RenderedStory: React.FC = () => {
    const [baseSizePx, setBaseSizePx] = useState(0);

    useEffect(() => {
        // Assuming the variable is defined on the :root element
        const computedStyle = getComputedStyle(document.documentElement);
        const result = computedStyle.getPropertyValue('--ods-space-base').split('px')[0];
        setBaseSizePx(parseFloat(result));
    }, []);

    const tokens = Object.entries(resolveConfig(tailwindConfig).theme.spacing)
        .map(([key, value]) => {
            const parsedKey = parseFloat(key);
            let pxSize = baseSizePx * parsedKey;
            let remSize = pxToRem(pxSize);

            if (Number.isNaN(parsedKey)) {
                pxSize = 1;
                remSize = 1;
            }
            return { key: key, px: pxSize, rem: remSize, value: value as string };
        })
        .sort((a, b) => a.px - b.px);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <table className="px-4-collapse table-fixed border-b bg-white text-neutral-800">
                <thead>
                    <tr className="text-left">
                        <th className="border-b px-4 py-2">Name</th>
                        <th className="border-b px-4 py-2">Size</th>
                        <th className="border-b px-4 py-2">Pixels</th>
                        <th className="border-b" />
                    </tr>
                </thead>
                <tbody>
                    {tokens.map(({ key, px, rem, value }) => (
                        <DisplayComponent key={key} name={key} sizePx={px} sizeRem={rem} value={value} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const Default: Story = {
    render: () => <RenderedStory />,
};

export default meta;
