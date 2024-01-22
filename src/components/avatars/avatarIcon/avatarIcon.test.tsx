import { render, screen } from '@testing-library/react';

import { IconType } from '../../icon';
import { AvatarIcon, type IAvatarIconProps } from './avatarIcon';

describe('<AvatarIcon /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarIconProps>) => {
        const completeProps: IAvatarIconProps = { icon: IconType.ADD, ...props };

        return <AvatarIcon {...completeProps} />;
    };

    it('renders the AvatarIcon component', () => {
        render(createTestComponent({ icon: IconType.APP_FINANCE }));
        expect(screen.getByTestId(IconType.APP_FINANCE)).toBeInTheDocument();
    });
});
