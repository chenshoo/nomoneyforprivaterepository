/**
 * Created by nirbenya on 19/05/2018.
 */
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6


class Transition extends React.Component {

    static defaultProps = {
        name: 'transition'
    }

    render() {

        const { children, name } = this.props;

        return (
            <ReactCSSTransitionGroup
                transitionName={name}
                transitionAppear={true}
                transitionAppearTimeout={300}
                transitionEnter={false}
                transitionLeave={true}
            >

                {children}
            </ReactCSSTransitionGroup>
        )

    }
}

export default Transition;