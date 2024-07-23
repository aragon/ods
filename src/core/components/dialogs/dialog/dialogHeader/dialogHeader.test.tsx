import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../../icon';
import { DialogRoot } from '../dialogRoot';
import { DialogHeader, type IDialogHeaderProps } from './dialogHeader';

describe('<Dialog.Header/> component', () => {
    const createTestComponent = (props?: Partial<IDialogHeaderProps>) => {
        const completeProps: IDialogHeaderProps = { title: 'title', description: 'test', ...props };

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

    it('renders a back button when showBackButton is set to true', () => {
        render(createTestComponent({ showBackButton: true }));

        const backIcon = screen.getByTestId(IconType.CHEVRON_LEFT);
        // eslint-disable-next-line testing-library/no-node-access
        expect(backIcon.closest('button')).toBeInTheDocument();
    });

    it('calls onBackClick when the back button is clicked', async () => {
        const user = userEvent.setup();
        const handleBackClick = jest.fn();

        render(createTestComponent({ showBackButton: true, onBackClick: handleBackClick }));

        const backIcon = screen.getByTestId(IconType.CHEVRON_LEFT);
        await user.click(backIcon);

        expect(handleBackClick).toHaveBeenCalled();
    });

    it('calls onCloseClick when the close button is clicked', async () => {
        const handleOnCloseClick = jest.fn();

        render(createTestComponent({ onCloseClick: handleOnCloseClick }));

        await userEvent.click(screen.getByRole('button'));
        expect(handleOnCloseClick).toHaveBeenCalled();
    });
});
