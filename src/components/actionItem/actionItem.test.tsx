import { render, screen } from '@testing-library/react';
import { IconType } from '../icon';
import { ActionItem, type IActionItemProps } from './actionItem';

describe('<ActionItem /> component', () => {
    const createTestComponent = (props?: Partial<IActionItemProps>) => {
        const completeProps: IActionItemProps = { ...props };

        return <ActionItem {...completeProps} />;
    };

    it('renders the action item component', () => {
        const children = 'action-item-content';
        const href = '/test';
        render(createTestComponent({ href, children }));
        const link = screen.getByRole<HTMLAnchorElement>('link', { name: children });
        expect(link).toBeInTheDocument();
        expect(link.href).toContain(href);
        expect(screen.getByTestId(IconType.CHEVRON_RIGHT)).toBeInTheDocument();
    });
});
