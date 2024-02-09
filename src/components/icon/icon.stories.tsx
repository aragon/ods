import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';
import { IconType } from './iconType';

const meta: Meta<typeof Icon> = {
    title: 'components/Icon',
    component: Icon,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=8842-13134&mode=dev',
        },
    },
};

type Story = StoryObj<typeof Icon>;

/**
 * Default usage example of the Icon component.
 */
export const Default: Story = {
    args: {
        icon: IconType.ADD,
        responsiveSize: { md: 'lg' },
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
                    <div key={iconType} title={iconType}>
                        <Icon icon={iconType as IconType} size="lg" />
                    </div>
                ))}
            </div>
        );
    },
};

export default meta;
