import isPropValid from '@emotion/is-prop-valid';
import type { Preview } from '@storybook/react';
import React from 'react';
import { StyleSheetManager } from 'styled-components';
import '../index.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        (Story) => (
            <StyleSheetManager
                shouldForwardProp={(propName, elementToBeRendered) =>
                    typeof elementToBeRendered === 'string' ? isPropValid(propName) : true
                }
            >
                <div className="flex">
                    <Story />
                </div>
            </StyleSheetManager>
        ),
    ],
};

export default preview;
