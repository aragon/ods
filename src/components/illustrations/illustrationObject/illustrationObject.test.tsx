import { render, screen } from '@testing-library/react';
import { IllustrationObject, type IIllustrationObjectProps } from './illustrationObject';

describe('<IllustrationObject /> component', () => {
    const createTestComponent = (props?: Partial<IIllustrationObjectProps>) => {
        const completeProps: IIllustrationObjectProps = {
            object: 'ACTION',
            ...props,
        };

        return <IllustrationObject {...completeProps} />;
    };

    it('renders the illustration object', () => {
        const object = 'MAGNIFYING_GLASS';
        render(createTestComponent({ object }));
        expect(screen.getByTestId(object)).toBeInTheDocument();
    });
});
