import React, { Component } from 'react';

// components
import Icon from 'components/Icon/Icon';

export default class ItemRemover extends Component {

    removeSelectedItem = ()=> {
        const { canvas } = this.props;
        canvas.getActiveObject().remove();
        this.setState({ show: false })

    };

    render(){
        return (
            <div>
                <div className="trash" onClick={this.removeSelectedItem}>
                    <Icon name="THRASH" />
                </div>)
            </div>
        );
    }
}
