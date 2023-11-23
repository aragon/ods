import { fireEvent, render, screen } from '@testing-library/react';

import { Avatar, type IAvatarProps } from './avatar';

const etherIcon = 'https://assets.coingecko.com/coins/images/279/large/ethereum.png';

describe('<Avatar /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarProps>) => {
        const completeProps: IAvatarProps = { ...props };

        return <Avatar {...completeProps} />;
    };

    it('renders the Avatar component', () => {
        render(createTestComponent({ src: etherIcon }));

        const avatarEl = screen.getByAltText('avatar');
        expect(avatarEl).toBeInTheDocument();
        expect(avatarEl).toHaveAttribute('src', etherIcon);
    });

    it('renders a fallback when no image source is provided', async () => {
        render(createTestComponent());
        expect(screen.getByTestId('fallbackAvatar')).toBeInTheDocument();
    });

    it('renders a fallback when source leads to broken image2', async () => {
        render(createTestComponent({ src: 'https://exxxsample.com/abc.jpg' }));

        fireEvent.error(screen.getByAltText('avatar'));

        expect(await screen.findByTestId('fallbackAvatar')).toBeInTheDocument();
    });

    it('renders a fallback with initials when src is not a valid image source', () => {
        render(createTestComponent({ src: 'Aragon Dao' }));
        expect(screen.getByTestId('fallbackAvatar')).toBeInTheDocument();
        expect(screen.getByText('AD')).toBeInTheDocument();
    });
});
