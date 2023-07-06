'use strict';

export default {
    '**/*.(ts|tsx|js|md|mdx|json|json5|yml|css|scss)': (filenames) => `yarn prettier --write ${filenames.join(' ')}`,
};
