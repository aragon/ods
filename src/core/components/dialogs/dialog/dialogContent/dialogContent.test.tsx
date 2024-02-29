import { render, screen } from '@testing-library/react';
import { DialogContent, type IDialogContentProps } from './dialogContent';

describe('<Dialog.Content/> component', () => {
    const createTestComponent = (props?: Partial<IDialogContentProps>) => {
        const completeProps: IDialogContentProps = { ...props };

        return <DialogContent {...completeProps} />;
    };

    it('renders the given content', () => {
        const content = 'Test content';

        render(createTestComponent({ children: content }));

        expect(screen.getByText(content)).toBeInTheDocument();
    });
});
