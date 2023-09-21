import { render, screen } from '@testing-library/react';
import { AlertCard, type IAlertCardProps } from './alertCard';

describe('<AlertCard />', () => {
    const createTestComponent = (props?: Partial<IAlertCardProps>) => {
        const completeProps: IAlertCardProps = {
            variant: 'critical',
            message: 'Message',
            description: 'Description',
            ...props,
        };

        return <AlertCard {...completeProps} />;
    };

    it('renders an alert', () => {
        render(createTestComponent());
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders message and description', () => {
        const description = 'Alert Description';
        const message = 'Alert Message';
        render(createTestComponent({ description, message }));
        expect(screen.getByText(description)).toBeVisible();
        expect(screen.getByText(message)).toBeVisible();
    });
});
