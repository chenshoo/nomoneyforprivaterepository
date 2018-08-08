import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

// components
import BootstrapLabel from 'react-bootstrap/lib/Label';
import Icon from 'components/Icon/Icon';

import iconsConstants from 'constants/iconConstants';

addStyle(BootstrapLabel, 'match');
addStyle(BootstrapLabel, 'brand');
addStyle(BootstrapLabel, 'brand-clean');
addStyle(BootstrapLabel, 'imob');
addStyle(BootstrapLabel, 'badge-success');
addStyle(BootstrapLabel, 'stroke-white');
addStyle(BootstrapLabel, 'blue');
addStyle(BootstrapLabel, 'green');
addStyle(BootstrapLabel, 'green-success');
addStyle(BootstrapLabel, 'orange');


const onClickPreventDefault = onClick => e => {
    if (!onClick) return;
    e.preventDefault();
    e.stopPropagation();
    return onClick(e);
};

export const ActionIcon = ({ children, onClick }) => (
    <div className="box-label-action-icon" onClick={onClickPreventDefault(onClick)}>
        {children ? children : <i className={iconsConstants.CLOSE} />}
    </div>
);

ActionIcon.propTypes = {
    children: PropTypes.element,
    onClick: PropTypes.func
};

export const Emphasis = ({ children, onClick }) => (
    <span className="box-label-emphasis" onClick={onClickPreventDefault(onClick)}>
        {children}
    </span>
);

Emphasis.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    onClick: PropTypes.func
};

export const Badge = ({ icon, onClick, theme }) => (
    <div className={classNames('box-label-badge', theme)} onClick={onClickPreventDefault(onClick)}>
        <Icon name={icon} />
    </div>
);


const LabelComponent = ({ children, block, className, onClick, size, bold, bsStyle, upperCase, weight, dir, ...rest }) => (

    <BootstrapLabel bsStyle={bsStyle} className={classNames('box-label', { block }, dir, className, size, {'clickable': onClick}, `weight-${weight}`, { 'uppercase': upperCase }, { 'bold': bold })} onClick={onClick} {...rest}>
        {children}
    </BootstrapLabel>

);

LabelComponent.propTypes = {
    children: PropTypes.node,
    weight: PropTypes.oneOf([700, 600, 500, 400, 300]),
    bsStyle: PropTypes.oneOf(['default'])
};

LabelComponent.defaultProps = {
    size: 'md',
    weight: 300,
    bsStyle: 'default'
};

LabelComponent.ActionIcon = ActionIcon;
LabelComponent.Emphasis = Emphasis;
LabelComponent.Badge = Badge;

export default LabelComponent

