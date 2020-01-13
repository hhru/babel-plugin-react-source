"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Component1 = function Component1(_ref) {
  var content = _ref.content;
  return _react["default"].createElement("div", {
    source: "test/fixtures/env/2/input.js:4"
  }, content);
};

var Component2 = function Component2() {
  return _react["default"].createElement(Component1, {
    content: _react["default"].createElement("span", {
      source: "test/fixtures/env/2/input.js:8"
    })
  });
};

var _default = Component2;
exports["default"] = _default;