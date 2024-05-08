import { render, screen } from '@testing-library/react';
import { CardCollapsible, type ICardCollapsibleProps } from './cardCollapsible';

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

describe('<CardCollapsible />', () => {
    const createTestComponent = (props?: Partial<ICardCollapsibleProps>) => {
        const completeProps = { ...props };

        return <CardCollapsible {...completeProps} />;
    };

    it('renders without crashing', () => {
        const children = 'Content of the card';
        render(createTestComponent({ children }));
        expect(screen.getByText('Content of the card')).toBeInTheDocument();
    });
});
