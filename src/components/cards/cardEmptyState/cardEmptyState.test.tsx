import { render } from '@testing-library/react';
import { Props } from './cardEmptyState';

describe('cardEmptyState', () => {
    const defaultProps: Props = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<cardEmptyState {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('cardEmptyState')).toBeTruthy();
    });
});
