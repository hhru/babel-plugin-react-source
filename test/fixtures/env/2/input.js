import React from 'react';

const Component1 = ({content}) => {
    return <div>{content}</div>;
};

const Component2 = () => {
    return <Component1 content={<span />}/>;
};

export default Component2;
