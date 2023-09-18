import { render, screen } from '@testing-library/react';
import { Button, type IButtonProps } from './button';

describe('<Button /> component', () => {
    const createTestComponent = (props?: Partial<IButtonProps>) => {
        return <Button {...props} />;
    };

    it('renders a button', () => {
        render(createTestComponent());
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
