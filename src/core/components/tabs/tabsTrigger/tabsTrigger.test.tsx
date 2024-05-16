import { render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import { Tabs, type ITabsTriggerProps } from '../../tabs';

describe('<Tabs.Trigger /> component', () => {
    const createTestComponent = (props?: Partial<ITabsTriggerProps>, isUnderlined?: boolean) => {
        const completeProps: ITabsTriggerProps = {
            label: 'Tab 1',
            value: '1',
            ...props,
        };

        return (
            <Tabs.Root isUnderlined={isUnderlined}>
                <Tabs.List>
                    <Tabs.Trigger {...completeProps} />
                </Tabs.List>
            </Tabs.Root>
        );
    };

    it('should render without crashing', () => {
        render(createTestComponent());

        expect(screen.getByRole('tab')).toBeInTheDocument();
    });

    it('should pass the correct value prop', () => {
        const value = 'complex1';
        render(createTestComponent({ value }));

        const triggerElement = screen.getByRole('tab');
        expect(triggerElement).toHaveAttribute('id', `radix-:r2:-trigger-${value}`);
    });

    it('should render the icon when iconRight is provided', () => {
        const iconRight = IconType.BLOCKCHAIN_BLOCK;
        render(createTestComponent({ iconRight }));

        expect(screen.getByTestId('BLOCKCHAIN_BLOCK')).toBeInTheDocument();
    });
});
