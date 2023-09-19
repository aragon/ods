import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';
import { IconType } from './iconType';

const meta: Meta<typeof Icon> = {
    title: 'components/Icon',
    component: Icon,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Icon>;

/**
 * Default usage example of the Icon component.
 */
export const Default: Story = {
    args: {
        icon: IconType.ADD,
    },
};

/**
 * All available icons of the ODS library.
 */
export const AvailableIcons: Story = {
    render: () => {
        return (
            <div className="flex flex-row flex-wrap gap-5">
                {Object.keys(IconType).map((iconType) => (
                    <Icon key={iconType} icon={iconType as IconType} size="lg" />
                ))}
            </div>
        );
    },
};

export default meta;
