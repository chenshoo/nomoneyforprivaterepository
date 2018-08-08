import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import classNames from 'classnames'

// actions
import { toggleSideBar } from 'actions/sidebar-actions/sidebar-actions'

// components
import MenuItem from "components/SideBarItem/SideBarItem"

// constants
import menu from 'constants/menu';

// helpers
import helpers from 'helpers/helpers'

export class CategoriesContainer extends Component {



    render = () => {

        const { onClose, isLoggedIn, isAdmin } = this.props;

        const visibleMenu = _.filter({ ...menu }, item => item.isVisible({ isLoggedIn, isAdmin }))

        return (
            <ul className={classNames('padding-top-small padding-right-none box-categories-container')}>
                {_.map(visibleMenu, menuItem => {

                    const { title, path, linkText, icon } = menuItem

                    return (
                        <MenuItem
                            onClick={onClose}
                            title={title}
                            path={path}
                            className="padding-right-small padding-left-small"
                            linkText={linkText || title}
                            icon={icon}
                            key={_.uniqueId()}
                        />
                    )
                })
                }

            </ul>
        )
    }
}


function mapStateToProps(state, ownProps) {

    return {
        isLoggedIn: _.get(state, 'auth.authenticated'),
        isAdmin: _.get(state, 'auth.user.isAdmin'),

    }
}

export default withRouter(connect(mapStateToProps, { toggleSideBar })(CategoriesContainer))