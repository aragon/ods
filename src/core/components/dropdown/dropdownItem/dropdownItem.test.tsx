import { render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import { DropdownContainer } from '../dropdownContainer/dropdownContainer';
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
        const icon = IconType.BLOCKCHAIN_BLOCKCHAIN;
        render(createTestComponent({ icon }));
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('renders a checkmark icon when the selected property is set to true', () => {
        const selected = true;
        render(createTestComponent({ selected }));
        expect(screen.getByTestId(IconType.CHECKMARK)).toBeInTheDocument();
    });

    it('renders the menuitem as link when the href property is set', () => {
        const href = 'https://test.com/';
        render(createTestComponent({ href }));
        const link = screen.getByRole<HTMLAnchorElement>('menuitem');
        expect(link).toBeInTheDocument();
        expect(link.href).toEqual(href);
    });

    it('renders a link icon when the href property is set', () => {
        const href = '/test';
        render(createTestComponent({ href }));
        expect(screen.getByTestId(IconType.LINK_EXTERNAL)).toBeInTheDocument();
    });

    it('renders the specified icon when the menu item is a link', () => {
        const icon = IconType.BLOCKCHAIN_BLOCKCHAIN;
        const href = '/test';
        render(createTestComponent({ icon, href }));
        expect(screen.getByTestId(icon)).toBeInTheDocument();
    });

    it('sets defaults rel attribute when link is external', () => {
        const href = 'https://www.test.com';
        const target = '_blank';
        const rel = 'test';
        render(createTestComponent({ href, target, rel }));
        expect(screen.getByRole<HTMLAnchorElement>('menuitem').rel).toEqual('noopener noreferrer test');
    });
});
