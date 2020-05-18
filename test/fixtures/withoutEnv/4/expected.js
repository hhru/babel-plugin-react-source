import React from 'react';
import Button from 'bloko/blocks/button';

const Component4 = () => {
  return React.createElement(Button, {
    source: "test/fixtures/withoutEnv/4/input.js:5"
  }, "text");
};

export default Component4;