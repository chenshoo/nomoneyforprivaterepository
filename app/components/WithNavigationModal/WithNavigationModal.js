/**
 * Created by nirbenya on 06/04/2018.
 */
import _ from 'lodash';
import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';


const withModalNavigation = (WrappedComponent, { baseUrl } = {}) => {
    return class extends Component {
        static propTypes = {
            router: PropTypes.object.isRequired,
            onCloseUrl: PropTypes.string
        };

        state = {
            show: true
        };

        static displayName = `withModalNavigation(${WrappedComponent.displayName || WrappedComponent.name})`;

        static WrappedComponent = Component;

        onHide = (options) => {
            const { router, history, onCloseUrl = baseUrl } = this.props;
            const customUrl = (_.get(options, 'customUrl'));

            const currentRouter = router || history;

            this.setState({ show : false  });

            _.delay(() => {
                //sometimes modal is still mounted so we need to set to true so the new modal will be shown
                this.setState({ show : true  });

                if (customUrl || onCloseUrl) {
                    currentRouter.push(customUrl || onCloseUrl);
                } else {
                    currentRouter.goBack()
                }
            }, 400)

        };

        render() {
            return <WrappedComponent {...this.props} onHide={this.onHide} baseUrl={baseUrl} show={this.state.show} />;
        }
    };
};

export default withModalNavigation;