import _ from 'lodash';
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Button from 'components/Button/Button'

// components
import FormControl from 'components/FormControl/FormControl'
import Form from 'react-bootstrap/lib/Form'
import { renderField, renderColoredRadio, renderWithError } from 'components/FormComponents/FormComponents';
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Grid from 'react-bootstrap/lib/Grid'

import { required } from 'utils/validation';

// actions
import { signUpUser } from 'actions/user-actions/user-actions'

const renderFieldWithError = renderWithError(renderField);

class SignUp extends React.Component {


    render() {

        const { submitting, handleSubmit } = this.props

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={4} smOffset={4}>
                        <Form className="sign-up-container" onSubmit={handleSubmit}>
                            <Field className="block margin-top-small" component={renderFieldWithError} name="username"
                                   placeholder="name"
                            />
                            <Field className="block margin-top-small" validate={required} component={renderFieldWithError} name="email"
                                   placeholder="email"
                            />
                            <Field className="block margin-top-small" validate={required} component={renderFieldWithError} type="password"
                                   name="password" placeholder="password"
                            />
                            <Button className="margin-top-small" block isLoading={submitting} type="submit">
                                הרשמה
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const SignUpForm = reduxForm({ form: 'login' })(SignUp)

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: (data) => {
            return dispatch(signUpUser(data)).then(action => {
                if (!_.get(action, 'error')) {
                    ownProps.history.push('/');
                }
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(SignUpForm)
