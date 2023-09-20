import type { Meta, StoryObj } from '@storybook/react';
import { IllustrationObject } from './illustrationObject';
import { IllustrationObjectType } from './illustrationObjectType';

const meta: Meta<typeof IllustrationObject> = {
    title: 'components/Illustrations/IllustrationObject',
    component: IllustrationObject,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof IllustrationObject>;

/**
 * Default usage example of the IllustrationObject component.
 */
export const Default: Story = {
    args: {
        object: IllustrationObjectType.ACTION,
    },
};

/**
 * All available illustration objects of the ODS library.
 */
export const AvailableIllustrationObjects: Story = {
    render: () => {
        const size = 160;

        return (
            <div className="flex flex-row flex-wrap gap-5">
                {Object.keys(IllustrationObjectType).map((illustrationObjectType) => (
                    <IllustrationObject
                        key={illustrationObjectType}
                        object={illustrationObjectType as IllustrationObjectType}
                        style={{ width: size, height: size }}
                    />
                ))}
            </div>
        );
    },
};

export default meta;
