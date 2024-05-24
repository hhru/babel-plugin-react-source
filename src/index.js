const { relative } = require('path');

const transform = ({ types }) => ({
    name: '@hh.ru/babel-plugin-react-source',
    visitor: {
        Program(path, state) {
            const libraries = state.opts.libraries ?? ['bloko', 'magritte'];
            const librariesImports = new Set();

            path.traverse({
                ImportDeclaration(path) {
                    if (libraries.some((library) => path.node.source.value.includes(library))) {
                        path.node.specifiers.forEach((specifier) => {
                            librariesImports.add(specifier.local.name);
                        });
                    }
                },
            });

            path.traverse({
                JSXOpeningElement(path) {
                    const identifier = path.node.name;
                    if (identifier.name === undefined) {
                        return;
                    }
                    if (identifier.name === identifier.name.toLowerCase() || librariesImports.has(identifier.name)) {
                        const source = `${relative(state.cwd, state.filename)}:${path.node.loc.start.line}`;
                        const name = types.JSXIdentifier('source');
                        const value = types.StringLiteral(source);
                        const attribute = types.JSXAttribute(name, value);
                        path.node.attributes.push(attribute);
                    }
                },
            });
        },
    },
});

module.exports = transform;
