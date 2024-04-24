import { render, screen } from '@testing-library/react';
import {
    AccordionContainer,
    type IAccordionContainerBaseProps,
    type IAccordionContainerProps,
} from './accordionContainer';

describe('<Accordion.Container /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionContainerProps>) => {
        if (props?.isMulti) {
            return <AccordionContainer isMulti={true} {...props} />;
        }

        const { isMulti, ...otherProps } = props as IAccordionContainerBaseProps<false>;

        return <AccordionContainer isMulti={false} {...otherProps} />;
    };

    it('renders the children property', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });

    it('renders correctly with isMulti prop true', () => {
        const isMulti = true;
        const children = 'Children OK';
        render(createTestComponent({ isMulti, children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });
});
