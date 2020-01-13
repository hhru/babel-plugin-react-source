const { relative } = require('path');

const transform = ({ types }) => ({
    name: '@hh.ru/babel-plugin-react-source',
    visitor: {
        JSXOpeningElement(path, state) {
            const identifier = path.node.name;
            if (identifier.name !== undefined && identifier.name === identifier.name.toLowerCase()) {
                const source = `${relative(state.cwd, state.filename)}:${path.node.loc.start.line}`;
                const name = types.JSXIdentifier('source');
                const value = types.StringLiteral(source);
                const attribute = types.JSXAttribute(name, value);
                path.node.attributes.push(attribute);
            }
        },
    },
});

module.exports = transform;
