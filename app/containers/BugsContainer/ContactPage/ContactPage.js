import _ from 'lodash';
import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import Form from 'react-bootstrap/lib/Form'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import GeneratorModal from 'components/GeneratorModal/GeneratorModal';
import { reduxForm, Field } from 'redux-form';
import { renderField, renderColoredRadio, renderWithError } from 'components/FormComponents/FormComponents';
import withModalNavigation from 'components/WithNavigationModal/WithNavigationModal';

// actions
import { sendMessageToAdmin, fetchUserMessages } from 'actions/user-messages-actions/user-messages-actions';

// helpers
import helpers from 'helpers/helpers';
import { required } from 'utils/validation';

const renderFieldWithError = renderWithError(renderField);

class ContactPage extends Component {

    render() {

        const { handleSubmit, submitting, show, onHide } = this.props;
        return (
            <Modal onHide={onHide} show={show} className="box-contact-page">
                <GeneratorModal.CloseButton onClick={onHide} />
                <Form className="padding-top-large" onSubmit={handleSubmit}>
                    <div className="inputs-wrapper">
                        <Field className="block margin-top-small" component={renderField} name="name" placeholder="שם"/>
                        <Field className="block margin-top-small" component={renderField}  name="email" placeholder="אי-מייל"/>
                        <Field className="block margin-top-small" component={renderColoredRadio} value="proposal"  type="radio" name="type" label="הצעה" />
                        <Field className="block margin-top-small" component={renderColoredRadio} value="bug" type="radio" name="type" label="באג" />
                        <Field validate={required}
                            className="block margin-top-small"
                            componentClass="textarea"
                            placeholder="הודעה"
                            component={renderFieldWithError}
                            name="message"
                            type="textarea"
                        />
                    </div>
                    <Button className="margin-top-small" block isLoading={submitting} type="submit"> שליחה</Button>
                </Form>

            </Modal>

        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.userMessages.isLoading
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onSubmit: data =>  {
            return dispatchProps.sendMessageToAdmin({ ...data, id: helpers.uniqueId() }).then(() => {
                dispatchProps.fetchUserMessages();
                ownProps.onHide();
            });
        }
    }
}

const ContactForm = reduxForm({ form: 'suggestions' })(ContactPage);

export default withModalNavigation(connect(mapStateToProps, { sendMessageToAdmin, fetchUserMessages }, mergeProps)(ContactForm), {  customUrl : '/bugs-page'})

