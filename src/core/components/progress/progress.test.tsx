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

    it('does not render the progress indicator by default', () => {
        render(createTestComponent());
        const progressIndicator = screen.queryByTestId('progress-indicator');
        expect(progressIndicator).not.toBeInTheDocument();
    });

    it('renders the progress indicator when the indicator prop is provided', () => {
        render(createTestComponent({ indicator: 50 }));
        const progressIndicator = screen.getByTestId('progress-indicator');
        expect(progressIndicator).toBeInTheDocument();
    });

    it('positions the progress indicator correctly when the indicator prop is provided', () => {
        const indicatorValue = 50;
        render(createTestComponent({ indicator: indicatorValue }));
        const progressIndicator = screen.getByTestId('progress-indicator');
        expect(progressIndicator).toHaveStyle(`left: ${indicatorValue}%`);
    });
});
