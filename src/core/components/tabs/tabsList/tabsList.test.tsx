// TabsRoot.test.tsx
import { render, screen } from '@testing-library/react';
import { Tabs, type ITabsListProps } from '../../tabs';

describe('<Tabs.Root /> component', () => {
    const createTestComponent = (props?: Partial<ITabsListProps>) => {
        const completeProps: ITabsListProps = {
            ...props,
        };
        return (
            <Tabs.Root>
                <Tabs.List {...completeProps}>
                    <Tabs.Trigger label="Tab 1" value="1" />
                    <Tabs.Trigger label="Tab 2" value="2" />
                </Tabs.List>
            </Tabs.Root>
        );
    };

    it('should render multiple tab triggers without crashing', () => {
        render(createTestComponent());

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
    });
});
