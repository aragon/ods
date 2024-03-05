import { render, screen } from '@testing-library/react';
import { DaoAvatar, type IDaoAvatarProps } from './daoAvatar';

describe('<DaoAvatar/> component', () => {
    const createTestComponent = (props?: Partial<IDaoAvatarProps>) => {
        const completeProps: IDaoAvatarProps = { ...props };

        return <DaoAvatar {...completeProps} />;
    };

    it('renders the daoName (in uppercase) as fallback if it is two characters or less', () => {
        let name = 'a';
        const { rerender } = render(createTestComponent({ name }));
        expect(screen.getByText(name.toUpperCase())).toBeInTheDocument();

        name = 'ab';
        rerender(createTestComponent({ name }));
        expect(screen.getByText(name.toUpperCase())).toBeInTheDocument();
    });

    it('renders the first letter of the first and second words of the daoName when it contains multiple words separated by a space', () => {
        const name = 'patito dao';
        const expected = 'PD';

        render(createTestComponent({ name }));
        expect(screen.getByText(expected)).toBeInTheDocument();
    });
});
