import React from 'react';

// components
import FormControl from 'components/FormControl/FormControl';
import Radio from 'components/Radio/Radio';

export const renderField = ({ input, meta, ...rest }) => {
    return(
        <FormControl {...input}  {...rest}   />
    );

}

export const renderWithError = (component) => ({ meta, ...rest}) => (
    <span>
        {component({meta, ...rest})}
        {meta.error && meta.touched && <div className="text-danger">{meta.error}</div>}
    </span>
);

export const renderColoredRadio = ({ className, input, meta, label, ...rest }) => (
    <Radio {...input} {...rest}>
        <span className="radio-label">{label}</span>
    </Radio>
);
