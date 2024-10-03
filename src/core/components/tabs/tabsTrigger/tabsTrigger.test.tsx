import { render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import { Tabs, type ITabsTriggerProps } from '../../tabs';

describe('<Tabs.Trigger /> component', () => {
    const createTestComponent = (props?: Partial<ITabsTriggerProps>) => {
        const completeProps: ITabsTriggerProps = {
            label: 'Tab 1',
            value: '1',
            ...props,
        };

        return (
            <Tabs.Root>
                <Tabs.List>
                    <Tabs.Trigger {...completeProps} />
                </Tabs.List>
            </Tabs.Root>
        );
    };

    it('renders a tab', () => {
        render(createTestComponent());
        const tab = screen.getByRole('tab');
        expect(tab).toBeInTheDocument();
        expect(tab.getAttribute('disabled')).toBeNull();
    });

    it('renders the icon when iconRight is provided', () => {
        const iconRight = IconType.BLOCKCHAIN_BLOCK;
        render(createTestComponent({ iconRight }));
        expect(screen.getByTestId(iconRight)).toBeInTheDocument();
    });

    it('disables the tab when the disabled property is set to true', () => {
        const disabled = true;
        render(createTestComponent({ disabled }));
        expect(screen.getByRole('tab').getAttribute('disabled')).toEqual('');
    });
});
