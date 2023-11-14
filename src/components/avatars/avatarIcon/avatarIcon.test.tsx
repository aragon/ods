import { render, screen } from '@testing-library/react';

import { IconType } from '../../icon';
import { AvatarIcon, type IAvatarIconProps } from './avatarIcon';

describe('<AvatarIcon /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarIconProps>) => {
        const completeProps: IAvatarIconProps = { ...props, icon: IconType.ADD };

        return <AvatarIcon {...completeProps} />;
    };

    it('renders the AvatarIcon component', () => {
        render(createTestComponent());
        expect(screen.getByTestId(IconType.ADD)).toBeInTheDocument();
    });
});
