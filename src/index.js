const { relative } = require('path');

const transform = ({ types }) => ({
    name: '@hh.ru/babel-plugin-react-source',
    visitor: {
        Program(path, state) {
            const blokoImports = new Set();
            const libraries = state.opts.libraries ?? ['magritte'];
            const librariesImports = new Set();

            path.traverse({
                ImportDeclaration(path) {
                    if (path.node.source.value.includes('bloko')) {
                        path.node.specifiers.forEach((specifier) => {
                            blokoImports.add(specifier.local.name);
                        });
                    }

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

                    const isBlokoImport = blokoImports.has(identifier.name);
                    if (
                        isBlokoImport ||
                        identifier.name === identifier.name.toLowerCase() ||
                        librariesImports.has(identifier.name)
                    ) {
                        const source = `${relative(state.cwd, state.filename)}:${path.node.loc.start.line}`;
                        const name = types.JSXIdentifier(isBlokoImport ? 'source' : 'data-source');
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
