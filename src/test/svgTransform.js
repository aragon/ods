const path = require('path');

const fileNameToComponent = (name) =>
    `${path.basename(name, '.svg')}-icon`
        .split(/\W+/)
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join('');

const fileNameToIcon = (name) =>
    path
        .basename(name, '.svg')
        .split(/\W+/)
        .map((part) => part.toUpperCase())
        .join('_');

const transform = (src, filePath) => {
    if (path.extname(filePath) !== '.svg') {
        return src;
    }

    const componentName = fileNameToComponent(filePath);
    const iconName = fileNameToIcon(filePath);

    return {
        code: `
            const React = require('react');

            function ${componentName}(props) {
                return React.createElement(
                    'svg',
                    Object.assign({}, props, {'data-testid': '${iconName}'})
                );
            }

            module.exports = ${componentName};
        `,
    };
};

module.exports = {
    process: transform,
};
