import React from 'react';

const Component1 = () => {
  return React.createElement("button", {
    type: "button",
    source: "test/fixtures/withoutEnv/1/input.js:4"
  }, "text");
};

export default Component1;