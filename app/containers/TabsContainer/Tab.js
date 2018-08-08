import React from 'react';
import classNames from 'classnames';

// components
import Icon from 'components/Icon/Icon';


const Tab = ({ className, icon, active, label, ...rest }) => {

    return (
        <div {...rest} className={classNames('box-tab', { active }, 'text-center', className)}>
            <Icon name={icon} theme={active ? 'main-brand' : 'gray-dark-no-hover'} />
            <small className="block">{label}</small>
        </div>
    )
}

export default Tab;