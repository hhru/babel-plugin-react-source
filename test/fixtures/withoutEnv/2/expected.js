import React from 'react';

const Component1 = ({
  content
}) => {
  return React.createElement("div", {
    source: "test/fixtures/withoutEnv/2/input.js:4"
  }, content);
};

const Component2 = () => {
  return React.createElement(Component1, {
    content: React.createElement("span", {
      source: "test/fixtures/withoutEnv/2/input.js:8"
    })
  });
};

export default Component2;