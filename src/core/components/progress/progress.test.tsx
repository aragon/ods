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
});
