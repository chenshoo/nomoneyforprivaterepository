import _ from 'lodash'
import React, { Component } from 'react'
import ReactCropper from 'react-cropper'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// components
import Button from 'components/Button/Button'
import Title from 'components/Title/Title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';


// helpers
import helpers from 'helpers/helpers'
import { blobToString } from 'containers/Generator/generator-helpers';

// services
import WebViewService from 'services/webViewService';

// actions
import { setUploadImage } from 'actions/upload-actions/upload-actions';

class Cropper extends Component {

    state = {
        uploadedImageFromWebView: '',
        isLoading: false
    }

    componentDidMount() {
        document.addEventListener('message', (e) => {
            this.setState({ uploadedImageFromWebView: 'data:image/png;base64,' + e.data })
        })
    }


    crop = () => {

        const { setUploadImage, match, onClose } = this.props;

        const id = _.get(match, 'params.id');

        this.setState({ isLoading: true }, () => {

            const image = this.cropper.getCroppedCanvas().toDataURL();

            _.delay(() => setUploadImage({ urlPath: image, id: id || helpers.uniqueId() }).then(() =>  onClose()), 500);
            
        });


    }

    render() {

        const { isLoading } = this.state;

        const image = ((_.get(this.props, 'image')) || this.state.uploadedImageFromWebView);
        const cropperStyle = {
            height: helpers.isMobile() ? 300 : 400,
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto'
        };
        return (
            <div>

                <Title theme="black">
                    חיתוך התמונה
                </Title>

                <ReactCropper
                    ref={node => this.cropper = node}
                    src={image}
                    style={cropperStyle}
                    background={false}
                    autoCropArea={1}
                />

                <Row>
                    <Col xs={10} xsOffset={1} sm={4} smOffset={4}>
                        <Button isLoading={isLoading} block onClick={this.crop} center className="center-block margin-top-md">
                            אישור
                        </Button>
                    </Col>
                </Row>

            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {

    const memeId = _.get(ownProps, 'match.params.id');

    return {
        image: _.get(state, ['upload', 'images', memeId, 'urlPath'])
    }
}

export default withRouter(connect(mapStateToProps, { setUploadImage })(Cropper))