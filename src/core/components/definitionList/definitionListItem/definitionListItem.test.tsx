import { render, screen } from '@testing-library/react';
import { DefinitionList, type IDefinitionListItemProps } from '../../definitionList';

describe('<DefinitionList.Item /> component', () => {
    const createTestComponent = (props?: Partial<IDefinitionListItemProps>) => {
        const completeProps: IDefinitionListItemProps = {
            term: 'Default Term',
            children: 'Default Description',
            ...props,
        };

        return (
            <DefinitionList.Container>
                <DefinitionList.Item {...completeProps} />
            </DefinitionList.Container>
        );
    };

    it('renders without crashing', () => {
        render(createTestComponent());

        expect(screen.getByText('Default Term')).toBeInTheDocument();
        expect(screen.getByText('Default Description')).toBeInTheDocument();
    });
});
