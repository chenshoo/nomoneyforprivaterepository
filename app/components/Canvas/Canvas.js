import _ from 'lodash';
import React, { Component } from 'react';
import classNames from 'classnames';

//helpers
import helpers from 'helpers/helpers';

class Canvas extends Component {

    state = {
        canvas : {}
    }


    componentDidMount() {

        const canvas = new fabric.Canvas('c', { allowTouchScrolling: true });

        this.setState({ canvas }, () => {

            this.props.setCanvas(canvas);

            if (helpers.isMobile()) {

                this.disableWindowScrollOnDrag();
            }
        });

    }

    disableWindowScrollOnDrag = () => {

        const { canvas } = this.state;

        canvas.on('mouse:down', function () {
            document.querySelector(".generator").style.overflow = 'visible'
            document.querySelector("body").style.overflow = 'visible'

        })
        canvas.on('mouse:up', function () {
            document.querySelector(".generator").style.overflow = 'scroll'
            document.querySelector("body").style.overflow = 'scroll'

        })
    }

    getHeight = () => {
        return _.get(this.canvasWrapper, 'offsetHeight');
    }

    render() {

        const { isLoading } = this.props;

        return (
            <div ref={node => this.canvasWrapper = node} className={classNames('with-shadow', 'generator__canvas-wrapper')}>
                <span className={classNames('canvas-inner-wrapper', { 'hidden' : isLoading })}>
                    <canvas height={1} id='c' dir="rtl" className={classNames({ 'loading' : isLoading })}/>
                </span>
                {isLoading && <div className="skeleton-canvas" />}
            </div>
        )
    }

}




export default Canvas;