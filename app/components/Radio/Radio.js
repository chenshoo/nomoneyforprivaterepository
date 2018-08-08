
import React from 'react';
import classNames from 'classnames';
import Radio from 'react-bootstrap/lib/Radio';

export default ({ className, ...rest }) => (
    <Radio className={classNames('box-radio', className)} {...rest} />
)