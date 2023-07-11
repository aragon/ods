import { render, screen } from '@testing-library/react';
import React from 'react';
import { Link } from './link';

describe('Link', () => {
    // eslint-disable-next-line
    function setup(args: any) {
        render(<Link {...args} />);
        return screen.getByTestId('link');
    }

    test('should render without crashing', () => {
        const element = setup({});
        expect(element).toBeInTheDocument;
    });
});
