import type { Meta, StoryObj } from '@storybook/react';

import { IconType } from '../../icon';
import { AvatarIcon } from './avatarIcon';

const meta: Meta<typeof AvatarIcon> = {
    title: 'components/Avatars/AvatarIcon',
    component: AvatarIcon,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof AvatarIcon>;

/**
 * Default usage example of AvatarIcon component.
 */
export const Default: Story = {
    args: {
        icon: IconType.APP_GOVERNANCE,
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=7853-14315&mode=dev',
        },
    },
};

export default meta;
