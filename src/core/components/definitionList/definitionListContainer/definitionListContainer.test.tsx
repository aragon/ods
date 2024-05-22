import { render, screen } from '@testing-library/react';
import { DefinitionList, type IDefinitionListContainerProps } from '../../definitionList';

describe('<DefinitionList.Container /> component', () => {
    const createTestComponent = (props?: Partial<IDefinitionListContainerProps>) => {
        const completeProps: IDefinitionListContainerProps = {
            ...props,
        };

        return <DefinitionList.Container {...completeProps} />;
    };

    it('renders the children property correctly', () => {
        const children = 'Test Definition List Item';
        render(createTestComponent({ children }));

        expect(screen.getByText('Test Definition List Item')).toBeInTheDocument();
    });
});
