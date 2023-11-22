import { render } from '@testing-library/react';
import { InputContainer } from './inputContainer';
import type { IInputContainerProps } from './inputContainer.api';

describe('<InputContainer /> component', () => {
    const createTestComponent = (props?: Partial<IInputContainerProps>) => {
        const completeProps = {
            id: 'test',
            ...props,
        };

        return <InputContainer {...completeProps} />;
    };

    it('TODO', () => {
        // TODO
        render(createTestComponent());
    });
});
