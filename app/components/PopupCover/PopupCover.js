import React from 'react';
import classNames from 'classnames';

export default ({ children, className, disabled, onClick }) => (
    <div onClick={onClick} className={classNames({"box-popup-cover" : !disabled}, className)}>
        {children}
    </div>
)