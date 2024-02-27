import { render, screen } from '@testing-library/react';
import { DataListContextProvider, type IDataListContext } from '../dataListContext';
import { dataListTestUtils } from '../dataListTestUtils';
import { DataListFilterStatus, type IDataListFilterStatusProps } from './dataListFilterStatus';

describe('<DataListFilterStatus /> component', () => {
    const createTestComponent = (values?: {
        props?: Partial<IDataListFilterStatusProps>;
        context?: Partial<IDataListContext>;
    }) => {
        const completeProps = { ...values?.props };

        return (
            <DataListContextProvider value={dataListTestUtils.generateContextValues(values?.context)}>
                <DataListFilterStatus {...completeProps} />
            </DataListContextProvider>
        );
    };

    it('todo', () => {
        render(createTestComponent());
        screen.debug();
    });
});
