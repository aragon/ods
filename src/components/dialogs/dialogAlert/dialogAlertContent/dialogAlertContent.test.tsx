import { render, screen } from '@testing-library/react';
import { DialogAlertContent, type IDialogAlertContentProps } from './dialogAlertContent';

describe('<DialogAlert.Content/> component', () => {
    const createTestComponent = (props?: Partial<IDialogAlertContentProps>) => {
        const completeProps: IDialogAlertContentProps = { ...props };

        return <DialogAlertContent {...completeProps} />;
    };

    it('renders the given content', () => {
        const content = 'Test content';

        render(createTestComponent({ children: content }));

        expect(screen.getByText(content)).toBeInTheDocument();
    });
});
