import { render } from '@testing-library/react';
import { DataListContextProvider } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import {
    DataListContainerSkeletonLoader,
    type IDataListContainerSkeletonLoaderProps,
} from './dataListContainerSkeletonLoader';

describe('<DataListContainerSkeletonLoader /> component', () => {
    const createTestComponent = (props?: Partial<IDataListContainerSkeletonLoaderProps>) => {
        const completeProps = { ...props };

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues()}>
                <DataListContainerSkeletonLoader {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('renders the skeleton loaders', () => {
        const { container } = render(createTestComponent());
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });
});
