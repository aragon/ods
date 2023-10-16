import { render, screen } from '@testing-library/react';
import { Spinner, type ISpinnerProps } from './spinner';

describe('<Spinner /> component', () => {
    const createTestComponent = (props?: Partial<ISpinnerProps>) => {
        const completeProps: ISpinnerProps = {
            variant: 'primary',
            size: 'md',
            ...props,
        };

        return <Spinner {...completeProps} />;
    };

    it('renders a spinner', () => {
        render(createTestComponent());
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
