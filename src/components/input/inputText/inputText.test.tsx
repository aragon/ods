import { render } from '@testing-library/react';
import { InputText, type IInputTextProps } from './inputText';

describe('<InputText /> component', () => {
    const createTestComponent = (props?: Partial<IInputTextProps>) => {
        const completeProps = { ...props };

        return <InputText {...completeProps} />;
    };

    it('TODO', () => {
        render(createTestComponent());
        // TODO
    });
});
