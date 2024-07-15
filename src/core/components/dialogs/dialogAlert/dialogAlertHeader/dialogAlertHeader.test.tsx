import { render, screen } from '@testing-library/react';
import { DialogAlertRoot } from '../dialogAlertRoot';
import { DialogAlertHeader, type IDialogAlertHeaderProps } from './dialogAlertHeader';

describe('<DialogAlert.Header/> component', () => {
    const createTestComponent = (props?: Partial<IDialogAlertHeaderProps>) => {
        const completeProps: IDialogAlertHeaderProps = { title: 'title', ...props };

        return (
            <DialogAlertRoot open={true}>
                <DialogAlertHeader {...completeProps} />;
            </DialogAlertRoot>
        );
    };

    it('renders the given title', () => {
        const title = 'test title';
        render(createTestComponent({ title, description: 'test' }));
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('renders a hidden description when defined', () => {
        const description = 'test-description';
        render(createTestComponent({ description }));
        expect(screen.getByText(description)).toBeInTheDocument();
    });
});
