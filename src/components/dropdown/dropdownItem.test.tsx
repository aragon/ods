import { render, screen } from '@testing-library/react';
import { IconType } from '../icon';
import { DropdownContainer } from './dropdownContainer';
import { DropdownItem, type IDropdownItemProps } from './dropdownItem';

describe('<Dropdown.Item /> component', () => {
    const createTestComponent = (props?: Partial<IDropdownItemProps>) => {
        const completeProps = {
            ...props,
        };

        return (
            <DropdownContainer open={true}>
                <DropdownItem {...completeProps} />
            </DropdownContainer>
        );
    };

    it('renders a menuitem element', () => {
        render(createTestComponent());
        expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });

    it('renders the item icon when defined', () => {
        const icon = IconType.BLOCKCHAIN;
        render(createTestComponent({ icon }));
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('renders a checkmark icon when the active property is set to true', () => {
        const active = true;
        render(createTestComponent({ active }));
        expect(screen.getByTestId(IconType.CHECKMARK)).toBeInTheDocument();
    });
});
