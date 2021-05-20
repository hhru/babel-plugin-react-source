const assert = require('assert');
const fs = require('fs');
const path = require('path');
const strip = require('strip-comments');
const { transformFileSync } = require('@babel/core');

const plugin = path.join(__dirname, '../src/index.js');
const fixturesDirEnv = path.join(__dirname, 'fixtures/env');
const fixturesDirWithoutEnv = path.join(__dirname, 'fixtures/withoutEnv');

const trim = (str) => str.replace(/^\s+|\s+$/, '');

const transformFile = (filename, isEnvPreset) =>
    // @babel/preset-react adds pure annotation block comments to components, better to strip it
    // https://github.com/babel/babel/tree/main/packages/babel-helper-annotate-as-pure
    strip.block(
        transformFileSync(filename, {
            babelrc: false,
            plugins: [plugin],
            presets: ['@babel/preset-react'].concat(isEnvPreset ? ['@babel/preset-env'] : []),
        }).code
    );

describe('@hh.ru/babel-plugin-react-source adds source line in react elements with env presets', () => {
    fs.readdirSync(fixturesDirEnv).forEach(function(fixture) {
        const actual = transformFile(path.join(fixturesDirEnv, fixture, 'input.js'), true);
        const expected = fs.readFileSync(path.join(fixturesDirEnv, fixture, 'expected.js'), 'utf8');
        it(path.basename(fixture), function () {
            assert.strictEqual(trim(actual), trim(expected));
        });
    });
});

describe('@hh.ru/babel-plugin-react-source adds source line in react elements without env presets', () => {
    fs.readdirSync(fixturesDirWithoutEnv).forEach(function(fixture) {
        const actual = transformFile(path.join(fixturesDirWithoutEnv, fixture, 'input.js'), false);
        const expected = fs.readFileSync(path.join(fixturesDirWithoutEnv, fixture, 'expected.js'), 'utf8');
        it(path.basename(fixture), function () {
            assert.strictEqual(trim(actual), trim(expected));
        });
    });
});
