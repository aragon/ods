import { render, screen } from '@testing-library/react';
import { Button, type IButtonProps } from './button';

describe('<Button /> component', () => {
    const createTestComponent = (props?: Partial<IButtonProps>) => {
        const completeProps: IButtonProps = {
            variant: 'primary',
            size: 'md',
            ...props,
        };

        return <Button {...completeProps} />;
    };

    it('renders a button', () => {
        render(createTestComponent());
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
