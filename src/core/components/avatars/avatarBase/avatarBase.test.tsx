import { render, screen } from '@testing-library/react';
import { OdsCoreProvider, type IOdsCoreContext } from '../../odsCoreProvider';
import { AvatarBase, type IAvatarBaseProps } from './avatarBase';

describe('<AvatarBase /> component', () => {
    const createTestComponent = (props?: Partial<IAvatarBaseProps>, context?: Partial<IOdsCoreContext>) => {
        const completeProps: IAvatarBaseProps = { ...props };

        return (
            <OdsCoreProvider values={context}>
                <AvatarBase {...completeProps} />
            </OdsCoreProvider>
        );
    };

    it('renders the image component set on the OdsCoreProvider', () => {
        const Img = (props: object) => <img data-testid="my-image-component" alt="test" {...props} />;
        const context = { Img };
        const props = { src: 'https://test.com/' };
        render(createTestComponent(props, context));
        const image = screen.getByRole<HTMLImageElement>('img');
        expect(image.src).toEqual(props.src);
        expect(screen.getByTestId('my-image-component')).toBeInTheDocument();
    });
});
