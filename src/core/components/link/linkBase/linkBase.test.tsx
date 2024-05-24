import { render, screen } from '@testing-library/react';
import { OdsCoreProvider, type IOdsCoreContext } from '../../odsCoreProvider';
import { LinkBase, type ILinkBaseProps } from './linkBase';

describe('<LinkBase /> component', () => {
    const createTestComponent = (props?: Partial<ILinkBaseProps>, context?: Partial<IOdsCoreContext>) => {
        const completeProps: ILinkBaseProps = { ...props };

        return (
            <OdsCoreProvider values={context}>
                <LinkBase {...completeProps} />
            </OdsCoreProvider>
        );
    };

    it('renders the link component set on the OdsCoreProvider', () => {
        const Link = (props: object) => (
            <a data-testid="my-link-component" {...props}>
                Link
            </a>
        );
        const context = { Link };
        const props = { href: 'https://link.com/' };
        render(createTestComponent(props, context));
        const link = screen.getByRole<HTMLAnchorElement>('link');
        expect(link.href).toEqual(props.href);
        expect(screen.getByTestId('my-link-component')).toBeInTheDocument();
    });
});
