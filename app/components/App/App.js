import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// containers
import Header from 'containers/Header/Header';
import SideMenu from 'containers/SideMenu/SideMenu';
import TabsContainer from 'containers/TabsContainer/TabsContainer';

// components
import MainView from 'components/MainView/MainView';
import Notification from 'containers/Notification/Notification';

// services
import AnalyticsService from 'services/Analytics';
import SentryService from 'services/SentryService';
import WebViewService from 'services/webViewService';

// helpers
import helpers from 'helpers/helpers';

// actions
import { fetchUser } from 'actions/user-actions/user-actions';


class App extends Component {

    componentDidMount() {

        console.log('env', process.env.NODE_ENV, ENV)

       this.props.fetchUser();

        AnalyticsService.init();
        AnalyticsService.sendEvent(helpers.isMobile() ? 'Mobile Entrance' : 'Desktop entrance');

        SentryService.init();

        WebViewService.setIsWebView(helpers.getQueryVariable('origin') === 'mobile');
        WebViewService.setIsAndroid(helpers.getQueryVariable('platform') === 'android');

        if (WebViewService.isWebView) {
            AnalyticsService.sendEvent('Mobile App entrance');
        }

    };

    render(){
        return (
            <div>
                {helpers.isMobile() && <TabsContainer />}
                <div className="flex app-container" >
                    <SideMenu />
                    <MainView />
                    <Notification />
                </div>
            </div>
        );
    }
}



export default withRouter(connect(null, { fetchUser })(App));

