import _ from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

// helpers
import helpers from 'helpers/helpers'

// constants
import menu from 'constants/menu'
import editorConstants from './editor-constants'

// components
import Button from 'components/Button/Button'
import { Field, reduxForm } from 'redux-form'
import Form from 'react-bootstrap/lib/Form'
import { renderField, renderColoredRadio } from 'components/FormComponents/FormComponents'

// actions
import { saveEditedMeme } from 'actions/admin-actions/admin-actions';

const MyForm = ({ handleSubmit, meme, saveEditedMeme, ...rest }) => {
    return (
        <Form onSubmit={handleSubmit}>
            {_.map(editorConstants, (field) => {
                return (
                    <Field
                        className="margin-top-small"
                        component={field.component}
                        name={field.name}
                        type={field.type || 'input'}
                        placeholder={field.name}
                        componentClass={field.type}
                        format={field.format || (value => value)}
                        parse={field.parse || (value => value)}
                    />
                )
            })}
            <Field className="margin-top-small" name="category" component="select">
                {_.map(menu, (value, prop) => {
                    return <option value={value.name} key={_.uniqueId()}>{prop}</option>
                })}
            </Field>
            <div className="utils">
                {meme && (
                    <Button onClick={() => saveEditedMeme({ meme: { ...meme, date: new Date() } })} className="margin-top-small" block bsStyle="brand">
                        update date
                    </Button>
                )}
                <Button className="margin-top-small" block bsStyle="success" type="submit">
                    Save meme
                </Button>
            </div>
        </Form>
    )
}

const EditForm = reduxForm({
    enableReinitialize: true
})(MyForm)


// config
import config from 'config/config'

class Editor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isSaved: false,
        }
    }


    onSave = (meme) => {
        const { meme: { urlPath, thumbPath } = {}, saveMeme } = this.props

        saveMeme({ meme: { ...meme, urlPath, thumbPath } })
        this.setState({ isSaved: true })

    }

    render() {
        const { meme: { urlPath } = {}, form, meme = {}, saveEditedMeme } = this.props

        return (
            <div className={classNames("container box-meme-admin-editor", { 'saved': this.state.isSaved })}>

                <img src={urlPath} style={{ width: '350px' }}/>

                <div className="form-container">
                    <EditForm saveEditedMeme={saveEditedMeme} meme={meme} initialValues={this.props.meme} onSubmit={this.onSave} form={form}/>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    return {
        form: ownProps.index,
    }
}

export default connect(mapStateToProps, { saveEditedMeme })(Editor)