import { render, screen } from '@testing-library/react';
import React from 'react';
import { Tag } from './tag';
import { TagProps } from './tag.api';

describe('Tag', () => {
    const createTestComponent = (props?: Partial<TagProps>) => {
        const completeProps = {
            children: 'my-label',
            ...props,
        };

        return <Tag {...completeProps} />;
    };

    it('renders the specified label', () => {
        const children = 'label-test';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });
});
