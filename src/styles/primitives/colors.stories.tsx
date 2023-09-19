// External dependencies
import type { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

// Types
type Story = StoryObj<typeof ColorSwatch>;
type Color = { shade: number; value: string };

/**
 * ColorSwatch component displays the color swatches with their respective shades.
 * @param {string} colorGroupName - Name of the color group.
 */
const ColorSwatch: FC<{ colorGroupName: string }> = ({ colorGroupName }) => {
    const [availableColors, setAvailableColors] = useState<Color[]>([]);

    useEffect(() => {
        const colors = getAvailableColors(colorGroupName);
        setAvailableColors(colors);
    }, [colorGroupName]);

    return (
        <div className="rounded-xl border bg-neutral-0 p-8 font-semibold text-neutral-800">
            <div className="pb-8 text-lg capitalize">{colorGroupName}</div>
            <div className="flex flex-col gap-y-6">
                <div className="flex flex-row items-center gap-x-10">
                    <span className="w-24">Swatch</span>
                    <span>Hex</span>
                </div>
                {availableColors.map(({ shade, value }) => (
                    <div key={shade} className="flex items-center gap-x-10">
                        <div
                            className="flex h-24 w-24 items-center justify-center rounded-xl"
                            style={{ background: `var(--ods-color-${colorGroupName}-${shade})` }}
                        >
                            <span className={classNames({ 'text-neutral-0': shade > 300 })}>{shade}</span>
                        </div>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * Fetches the available colors from the DOM for the provided color group.
 * @param {string} colorGroupName - Name of the color group.
 * @returns {Color[]} Array of available colors.
 */
const getAvailableColors = (colorGroupName: string): Color[] => {
    const shades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const rootStyles = getComputedStyle(document.documentElement);

    return shades
        .map((shade) => ({ shade, value: rootStyles.getPropertyValue(`--ods-color-${colorGroupName}-${shade}`) }))
        .filter((shade) => shade.value.trim() !== '');
};

// Storybook stories
export const Primary: Story = {
    render: () => <ColorSwatch colorGroupName="primary" />,
};

export const Neutral: Story = {
    render: () => <ColorSwatch colorGroupName="neutral" />,
};

export const Support: Story = {
    render: () => (
        <div className="align-center flex flex-col p-5">
            <div className="p-8 text-center text-xl font-bold text-neutral-800">Support</div>
            <div className="flex space-x-3">
                <ColorSwatch colorGroupName="info" />
                <ColorSwatch colorGroupName="success" />
                <ColorSwatch colorGroupName="warning" />
                <ColorSwatch colorGroupName="critical" />
            </div>
        </div>
    ),
};

const meta: Meta<typeof ColorSwatch> = {
    title: 'design-tokens/primitive/Colors',
    component: ColorSwatch,
};

export default meta;
