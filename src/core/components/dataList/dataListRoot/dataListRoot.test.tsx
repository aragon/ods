import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from '../../button';
import { useDataListContext } from '../dataListContext';
import { DataListItem } from '../dataListItem';
import { DataListRoot, type IDataListRootProps } from './dataListRoot';

describe('<DataList.Root /> component', () => {
    const createTestProps = (props?: Partial<IDataListRootProps>): IDataListRootProps => ({
        entityLabel: 'test',
        ...props,
    });

    const createTestComponent = (props?: Partial<IDataListRootProps>) => {
        const completeProps = createTestProps(props);

        return <DataListRoot {...completeProps} />;
    };

    it('renders the data list items', () => {
        const children = [<DataListItem key="1" href="www.aragon.org" />];
        render(createTestComponent({ children }));
        expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('provides a function that increases the internal current page and triggers the onLoadMore callback', async () => {
        const user = userEvent.setup();
        const onLoadMore = jest.fn();
        const ChildrenComponent = () => {
            const { currentPage, handleLoadMore } = useDataListContext();

            return (
                <DataListItem>
                    <Button onClick={() => handleLoadMore(currentPage + 1)}>{currentPage}</Button>
                </DataListItem>
            );
        };

        render(
            <DataListRoot {...createTestProps({ onLoadMore })}>
                <ChildrenComponent />
            </DataListRoot>,
        );

        await user.click(screen.getByRole('button'));
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(onLoadMore).toHaveBeenCalled();
    });
});
