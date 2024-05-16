import { render, screen } from '@testing-library/react';
import { DefinitionList, type IDefinitionListContainerProps } from '../../definitionList';

describe('<DefinitionList.Container /> component', () => {
    const createTestComponent = (props?: Partial<IDefinitionListContainerProps>) => {
        const completeProps: IDefinitionListContainerProps = {
            ...props,
        };

        return <DefinitionList.Container {...completeProps} />;
    };

    it('renders without crashing', () => {
        const children = 'Test Definition List Item';
        render(createTestComponent({ children }));

        expect(screen.getByText('Test Definition List Item')).toBeInTheDocument();
    });

    it('processes children correctly using Children.toArray', () => {
        const children = [
            <DefinitionList.Item key="1" term="Term">
                Description
            </DefinitionList.Item>,
            <DefinitionList.Item key="2" term="Term 2">
                Description 2
            </DefinitionList.Item>,
        ];
        render(createTestComponent({ children }));

        const termElements = screen.queryAllByRole('term');
        const descriptionElements = screen.queryAllByRole('definition');

        expect(termElements).toHaveLength(children.length);
        expect(descriptionElements).toHaveLength(children.length);
    });
});
