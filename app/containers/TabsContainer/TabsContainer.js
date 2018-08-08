import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// components
import Tab from 'containers/TabsContainer/Tab';

// constants
import tabs from './tabs-constants';

class TabsContainer extends React.Component {


    state = {
        active: '/'
    }

    onTabClick = ({ to } = {}) => {
        this.props.history.push(to);
        this.setState({ active: to })
    }

    render() {
        const { isLoggedIn, ...rest } = this.props;
        const { active } = this.state;

        return(
            <div className="tabs-container visible-mobile-flex">
                {_.map(tabs, tab => {
                    return (
                        tab.isVisible({ isLoggedIn }) && (
                            <Tab
                                {...tab}
                                active={active === tab.to}
                                onClick={() => this.onTabClick({ to: tab.to })}
                            />
                        )
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
   return {
       isLoggedIn: state.auth.authenticated,
   }
}

export default withRouter(connect(mapStateToProps)(TabsContainer));