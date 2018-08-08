import React from 'react';
import classNames from 'classnames';

// components
import ReactDropzone from 'react-dropzone'


const DropZone = ({ className, theme, ...rest }) => (
    <ReactDropzone className={classNames('box-dropzone', theme, className)} {...rest} />
)

export default DropZone;