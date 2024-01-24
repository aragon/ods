import { render } from '@testing-library/react';
import { TextAreaRichText, type ITextAreaRichTextProps } from './textAreaRichText';

describe('<TextAreaRichText /> component', () => {
    const createTestComponent = (props?: Partial<ITextAreaRichTextProps>) => {
        const completeProps: ITextAreaRichTextProps = { ...props };

        return <TextAreaRichText {...completeProps} />;
    };

    it('TODO', () => {
        render(createTestComponent());
    });
});
