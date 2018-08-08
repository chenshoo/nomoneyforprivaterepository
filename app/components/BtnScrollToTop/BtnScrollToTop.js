import React, { Component } from 'react';

export default class BtnScrollToTop extends Component {

    state = {
        show : false
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    };

    handleScroll = () => {
        if (window.pageYOffset > window.innerHeight - window.innerHeight / 2) {
            this.setState({show : true})
        } else{
            this.setState({show : false})
        }
    };

    static scrollToTop = () => {
        let currentPosition = window.pageYOffset;
        const interval = setInterval(() => {
            currentPosition -= 20;
            window.scrollTo(100, currentPosition)
            if(currentPosition < 0){
                clearInterval(interval);
            }
        },5)
    };

    render(){

        return (
            <div className="back-to-top" onClick={this.scrollToTop}>
                {this.state.show && (
                <div className="back-to-top__wrapper">
                    <span className="glyphicon glyphicon-chevron-up"/>
                </div>
                )}
            </div>
        );
    }
}
