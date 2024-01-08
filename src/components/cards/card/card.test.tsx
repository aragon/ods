import { render, screen } from '@testing-library/react';
import { Card, type ICardProps } from './card';

describe('<Card /> component', () => {
    const createTestComponent = (props?: Partial<ICardProps>) => {
        const completeProps = { ...props };

        return <Card {...completeProps} />;
    };

    it('renders the card content', () => {
        const children = 'cardContent';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
