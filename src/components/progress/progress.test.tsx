import { render, screen } from '@testing-library/react';
import { Progress, type IProgressProps } from '.';

describe('<Progress /> component', () => {
    const createTestComponent = (props?: Partial<IProgressProps>) => {
        const completeProps: IProgressProps = {
            value: 0,
            ...props,
        };

        return <Progress {...completeProps} />;
    };

    it('renders a progress indicator', () => {
        render(createTestComponent());
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    describe('variant tests', () => {
        it('renders medium variant correctly', () => {
            render(createTestComponent({ variant: 'md' }));
            const progressBar = screen.getByRole('progressbar');
            expect(progressBar).toHaveClass('h-[8px]');
        });

        it('renders small variant correctly', () => {
            render(createTestComponent({ variant: 'sm' }));
            const progressBar = screen.getByRole('progressbar');
            expect(progressBar).toHaveClass('h-[4px]');
        });
    });
});
