"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("bloko/blocks/button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Component4 = function Component4() {
  return _react["default"].createElement(_button["default"], {
    source: "test/fixtures/env/4/input.js:5"
  }, "text");
};

var _default = Component4;
exports["default"] = _default;