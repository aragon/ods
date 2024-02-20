import { render, screen } from '@testing-library/react';

import { IconType } from '../../icon';
import { AvatarIcon, type IAvatarIconProps } from './avatarIcon';

describe('<AvatarIcon /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarIconProps>) => {
        const completeProps: IAvatarIconProps = { icon: IconType.PLUS, ...props };

        return <AvatarIcon {...completeProps} />;
    };

    it('renders the specified icon', () => {
        render(createTestComponent({ icon: IconType.APP_ASSETS }));
        expect(screen.getByTestId(IconType.APP_ASSETS)).toBeInTheDocument();
    });
});
