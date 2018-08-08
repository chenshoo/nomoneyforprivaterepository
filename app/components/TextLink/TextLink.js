import React from 'react';
import classNames from 'classnames';

// components
import { Link } from 'react-router-dom';

const TextLink =  ({children, className, ...props}) => {

    return (
        <Link {...props} className={classNames('box-text-link', className)}>
            {children}
        </Link>
    )
}

export default TextLink;
