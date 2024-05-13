import { render } from '@testing-library/react';
import { Props } from './tabsList';

describe('tabsList', () => {
    const defaultProps: Props = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<tabsList {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('tabsList')).toBeTruthy();
    });
});
