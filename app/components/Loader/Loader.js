import React from 'react'
import classNames from  'classnames';
import PropTypes from 'prop-types';

const Spinner = ({ type, className, theme }) => {

    switch(type) {

        case 'round-empty': {
            return(
                <div className={classNames('box-round-empty-loader', `theme-${theme}`, className)}>
                    <div>
                        <div className="round-loader"/>
                    </div>
                    <div className="load-text">
                    </div>
                </div>
            )
        }
        case 'spinner': {
            return(
                <div className="spinner"/>
            )
        }
    }
}


Spinner.defaultProps = {
    type: 'round-empty',
    theme:'default'
}

Spinner.propTypes = {
    theme: PropTypes.oneOf(['default', 'brand' ])
}

export default Spinner;