import { render, screen } from '@testing-library/react';
import { DaoAvatar, type IDaoAvatarProps } from './daoAvatar';

describe('<DaoAvatar/> component', () => {
    const createTestComponent = (props?: Partial<IDaoAvatarProps>) => {
        const completeProps: IDaoAvatarProps = { daoName: 'Test Dao', ...props };

        return <DaoAvatar {...completeProps} />;
    };

    it('renders the daoName (in uppercase) as fallback if it is two characters or less', () => {
        let daoName = 'a';
        const { rerender } = render(createTestComponent({ daoName }));
        expect(screen.getByText(daoName.toUpperCase())).toBeInTheDocument();

        daoName = 'ab';
        rerender(createTestComponent({ daoName }));
        expect(screen.getByText(daoName.toUpperCase())).toBeInTheDocument();
    });

    it('renders the first letter of the first and second words of the daoName when it contains multiple words separated by a space', () => {
        const daoName = 'patito dao';
        const expected = 'PD';

        render(createTestComponent({ daoName }));
        expect(screen.getByText(expected)).toBeInTheDocument();
    });
});
