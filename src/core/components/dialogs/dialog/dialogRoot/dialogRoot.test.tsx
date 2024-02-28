import { render, screen } from '@testing-library/react';
import { DialogRoot, type IDialogRootProps } from './dialogRoot';

describe('<Dialog.Root/> component', () => {
    const createTestComponent = (rootProps?: Partial<IDialogRootProps>) => {
        const completeRootProps: IDialogRootProps = {
            ...rootProps,
        };

        return <DialogRoot {...completeRootProps} />;
    };

    it('does not render the dialog by default', () => {
        render(createTestComponent());

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders the dialog with the given content', () => {
        const content = 'test content';

        render(createTestComponent({ open: true, children: content }));

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText(content)).toBeInTheDocument();
    });
});
