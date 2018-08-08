import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

// config
import config from 'config/config'

// components
import Dropzone from 'components/DropZone/DropZone';
import Button from 'components/Button/Button';import Title from 'components/Title/Title'
import Text from 'components/Text/Text'
import { Field, reduxForm } from 'redux-form'
import Form from 'react-bootstrap/lib/Form'
import { renderField, renderColoredRadio } from 'components/FormComponents/FormComponents'
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

// helpers
import { blobToString } from 'containers/Generator/generator-helpers';
import helpers from 'helpers/helpers';

const MyForm = ({ handleSubmit, item, saveEditedMeme, ...rest }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Field className="margin-top-small" placeholder="name" name="name" component={renderField} />
            <Field className="margin-top-small" placeholder="description" name="description" component={renderField} />

            <div className="utils">

                <Button className="margin-top-small center-block" bsStyle="success" type="submit">
                    Save meme
                </Button>
            </div>
        </Form>
    )
}

const EditForm = reduxForm({
    enableReinitialize: true
})(MyForm)

class UserGeneratedMemesContainer extends React.Component {

    state = {
        items: {},
    }


    getItems = () => {

        axios.get(`${config.apiBaseUrl}/items`)
            .then(res => {
                this.setState({ items: res.data })
            })
    }

    async createItemObj(base64) {
        return {
            image: base64,
        }
    }


    handleFileSelect = async (selectedFiles) => {
        const promisesToBase64 = _.map(selectedFiles,file => blobToString({ blob: file }) );

        Promise.all(promisesToBase64).then(images => {
            const promises = _.map(images, image => this.createItemObj(image));

            Promise.all(promises).then(memes => {
                _.forEach(memes, meme => {
                    const id = _.uniqueId();
                    this.setState({
                        items: { ...this.state.items, [id]: { ...meme, id} },
                    })
                })
            })

        })

    }

    onSave = data => {
        axios.post(`${config.apiBaseUrl}/items`, data);
    }

    render() {

        const { items } = this.state

        return (
            <div>
                <Button
                    onClick={this.getItems}
                    size="sm"
                    block
                    center
                    bsStyle="info"
                    className="margin-bottom-small"

                >
                    GET THOSE ITEMS
                </Button>
                <Button
                    onDrop={this.handleFileSelect}
                    size="sm"
                    componentClass={Dropzone}
                    center
                    multiple
                    block
                    bsStyle="success"
                >
                    upload
                </Button>

                <Title>({_.size(items)})</Title>

                <div className="margin-top-large container">
                    {_.map(_.values(items), (item, index) => (
                        <Row className="margin-top-small">
                            <hr/>
                            <Col xs={6} xsOffset={3}>
                                <img style={{  maxWidth: '200px'}} className="img-responsive center-block" src={item.image} />

                                <div className="form-container margin-top-small">
                                    <EditForm item={item} initialValues={item} onSubmit={this.onSave} form={index  + 'form'}/>
                                </div>
                            </Col>
                        </Row>
                    ))}

                </div>
            </div>
        )
    }
}


export default connect(null, {})(UserGeneratedMemesContainer)