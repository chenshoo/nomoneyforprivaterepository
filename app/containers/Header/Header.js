import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { withRouter } from 'react-router';

// actions
import { toggleSideBar } from '../../actions/sidebar-actions/sidebar-actions';

export class Header extends Component {

    render(){
        const { toggleSideBar, isSideBarOpen } = this.props;

        return (
            <header>
                <span className={classNames({ 'open': isSideBarOpen }, 'hamburger')} onClick={() => toggleSideBar(!isSideBarOpen) }>
                    <span/>
                    <span/>
                    <span/>
                </span>
            </header>
        )
    }
}


function mapStateToProps(state) {

    return {
        isSideBarOpen: state.isSideBarOpen,
        categoryName: _.get( state, 'category.name'),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleSideBar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))