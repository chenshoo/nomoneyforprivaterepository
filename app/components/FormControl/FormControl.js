import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// components
import BootstrapFormControl from 'react-bootstrap/lib/FormControl';


const FormControl = ({ className, theme, ...rest }) => (
    <BootstrapFormControl className={classNames('box-form-control', `theme-${theme}`,  className)} {...rest}/>
)

FormControl.defaultProps = {
    theme: PropTypes.oneOf(['default', 'shadow'])
}

export default FormControl;