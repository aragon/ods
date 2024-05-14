// TabsRoot.test.tsx
import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { Tabs, TabsContext, type ITabsRootProps } from '../../tabs';

const TestChild: React.FC = () => {
    const context = useContext(TabsContext);
    return <div data-testid="child">{context.isUnderlined ? 'Underlined' : 'Not Underlined'}</div>;
};

describe('<Tabs.Root /> component', () => {
    const createTestComponent = (props?: Partial<ITabsRootProps>) => {
        const completeProps: ITabsRootProps = {
            ...props,
        };
        return <Tabs.Root {...completeProps} />;
    };

    it('should render without crashing', () => {
        const children = <TestChild />;
        render(createTestComponent({ children }));
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should provide the correct context value', () => {
        const children = <TestChild />;
        const isUnderlined = true;

        render(createTestComponent({ isUnderlined, children }));
        expect(screen.getByTestId('child')).toHaveTextContent('Underlined');
    });
});
