import { render, screen } from '@testing-library/react';

import { Avatar, type IAvatarProps } from './avatar';

const etherIcon = 'https://assets.coingecko.com/coins/images/279/large/ethereum.png';

describe('<Avatar /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarProps>) => {
        const completeProps: IAvatarProps = { ...props };

        return <Avatar {...completeProps} />;
    };

    it('renders the Avatar component', () => {
        render(createTestComponent({ src: etherIcon }));
        expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('renders a fallback with no image when no `src` is provided', () => {
        render(createTestComponent());
        expect(screen.getByTestId('fallbackAvatar')).toBeInTheDocument();
    });

    it('renders a fallback with initials when `copy` is provided and `src` is not', () => {
        render(createTestComponent({ copy: 'Patito Dao' }));
        expect(screen.getByTestId('fallbackAvatar')).toBeInTheDocument();
        expect(screen.getByText('PD')).toBeInTheDocument();
    });
});
