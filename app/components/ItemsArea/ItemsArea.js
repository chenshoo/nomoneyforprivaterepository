import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// helpers
import helpers  from 'helpers/helpers';

// components
import ItemRemover from './ItemRemover';
import SpinnerDots from 'components/SpinnerDots/SpinnerDots';
import Text from 'components/Text/Text';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import { fetchItems } from 'actions/item-actions/item-actions';

// services
import AnalyticsService from 'services/Analytics';

 class ItemsArea extends Component {


    componentDidMount = () => {
        this.props.fetchItems();
    }

    addItem = (item) => {
        const src = item.image;
        const { canvas } = this.props;
        const self = this;

        AnalyticsService.sendEvent('Item Added', item.name);

        fabric.Image.fromURL(src, (image) => {
            const size = helpers.isMobile() ? 60 : 120;
            image = helpers.modifyImageDimensions({ image, wantedMaxWidth: size, wantedMaxHeight: size });
            image.left = canvas.width / 2;
            image.top = canvas.height / 2;
            canvas.add(image);
            image.lockSkewingX = false;
            image.lockSkewingY = false;
            self.bringAllTextForward()
        });

        this.props.closeModal()

    };

    bringAllTextForward = () => {
        const { canvas } = this.props;
        for(var i = 0; i < canvas.getObjects().length; i++){
            if(canvas.getObjects()[i].text ){
                if(  canvas.getObjects()[i].text.length > 1){
                    if(canvas.getObjects()[i]._stroke === '#fff'){
                        canvas.getObjects()[i].bringToFront();
                    }
                }
            }
        }
    };


    clearSelectedItem(){
        if(this.props.canvas.getActiveObject()){
            this.props.canvas.getActiveObject().remove();
        }
    };

    render(){

        const { isFetching, items } = this.props;

        return (
            <div className="box-items-area">
                <Text weight={700} className="margin-top-small margin-bottom-small" size="sm" align="center" theme="black">
                    לחצו על פריט כדי להוסיפו למם
                </Text>

                {isFetching
                    ?
                    <SpinnerDots size="lg" className="margin-top-medium center-block" />
                    :
                    <Row className="items-container">
                        { _.map(_.reverse(items), (item = {}) => (
                            <Col
                                xs={4}
                                onClick={() => this.addItem(item)}
                                className="item"
                                key={_.uniqueId()}
                            >
                                    <img
                                        className="img-responsive"
                                        src={item.image}
                                    />
                                <Text className="margin-top-small" size="sm" align="center" theme="black">{item.name}</Text>
                            </Col>
                        ))}
                    </Row>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: _.get(state, 'items.items'),
        isFetching:  _.get(state, 'items.isFetching'),
    }
}

function mapDispatchToProps(dispatch) {
     return {
         fetchItems: () => dispatch(fetchItems()),
     }
}

export default connect(mapStateToProps, mapDispatchToProps )(ItemsArea);