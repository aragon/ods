import { render } from '@testing-library/react';
import { Props } from './tabsTrigger';

describe('tabsTrigger', () => {
    const defaultProps: Props = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<tabsTrigger {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('tabsTrigger')).toBeTruthy();
    });
});
