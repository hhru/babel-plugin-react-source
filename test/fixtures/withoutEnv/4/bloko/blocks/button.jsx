import React from 'react';

const Button = ({ ...props }) => {
    return <button type="button" {...props}>text</button>;
};

export default Button;
