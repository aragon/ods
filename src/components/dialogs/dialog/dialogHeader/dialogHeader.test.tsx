import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DialogRoot } from '../dialogRoot';
import { DialogHeader, type IDialogHeaderProps } from './dialogHeader';

describe('<Dialog.Header/> component', () => {
    const createTestComponent = (props?: Partial<IDialogHeaderProps>) => {
        const completeProps: IDialogHeaderProps = { title: 'title', ...props };

        return (
            <DialogRoot open={true}>
                <DialogHeader {...completeProps} />;
            </DialogRoot>
        );
    };

    it('renders the given title and description', () => {
        const title = 'test title';
        const description = 'test description';

        render(createTestComponent({ title, description }));

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAccessibleName(title);
        expect(dialog).toHaveAccessibleDescription(description);
    });

    it('calls onCloseClick when the close button is clicked', async () => {
        const handleOnCloseClick = jest.fn();

        render(createTestComponent({ onCloseClick: handleOnCloseClick }));

        await userEvent.click(screen.getByRole('button'));
        expect(handleOnCloseClick).toHaveBeenCalled();
    });
});
