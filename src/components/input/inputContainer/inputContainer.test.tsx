import { render } from '@testing-library/react';
import { InputContainer, type IInputContainerProps } from './inputContainer';

describe('<InputContainer /> component', () => {
    const createTestComponent = (props?: Partial<IInputContainerProps>) => {
        const completeProps = { ...props };

        return <InputContainer {...completeProps} />;
    };

    it('TODO', () => {
        // TODO
        render(createTestComponent());
    });
});
