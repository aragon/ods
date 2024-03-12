import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../core/components/dataList';
import { DaoDataListItem, type IDaoDataListItemProps } from './daoDataListItem';

describe('<DaoDataListItem /> component', () => {
    const createTestComponent = (props?: Partial<IDaoDataListItemProps>) => {
        return (
            <DataList.Root entityLabel="Daos">
                <DataList.Container>
                    <DaoDataListItem {...props} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders ensName and the daoName (in uppercase) as the avatar fallback', () => {
        let name = 'a';
        let daoAddressOrEns = 'a.eth';
        const { rerender } = render(createTestComponent({ name, daoAddressOrEns }));
        expect(screen.getByText(name.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(daoAddressOrEns)).toBeInTheDocument();

        name = 'ab';
        daoAddressOrEns = 'ab.eth';
        rerender(createTestComponent({ name, daoAddressOrEns }));
        expect(screen.getByText(name.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(daoAddressOrEns)).toBeInTheDocument();
    });

    it('does not render the daoAddressOrEns if it is not provided', () => {
        const name = 'a';
        render(createTestComponent({ name }));
        expect(screen.queryByText(/.eth/)).not.toBeInTheDocument();
    });

    it('renders the description with an ellipsis if it is more than two lines', () => {
        const description =
            'This is a very long description that should be more than two lines. It should end with an ellipsis.';
        render(createTestComponent({ description }));
        const descriptionElement = screen.getByText(/This is a very long description/);
        expect(descriptionElement).toHaveClass('line-clamp-2');
    });

    it('renders the network and plugin information correctly', () => {
        const network = 'ethereum';
        const plugin = 'token-based';
        render(createTestComponent({ network, plugin }));
        expect(screen.getByText(network)).toBeInTheDocument();
        expect(screen.getByText(plugin)).toBeInTheDocument();
    });
});
