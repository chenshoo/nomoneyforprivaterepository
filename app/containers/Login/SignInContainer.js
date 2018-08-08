import _ from 'lodash';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'components/Button/Button'

// components
import Form from 'react-bootstrap/lib/Form'
import { renderField, renderColoredRadio, renderWithError } from 'components/FormComponents/FormComponents';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';

// utils
import { required } from 'utils/validation';

// actions
import { signInUser } from 'actions/user-actions/user-actions';

const renderFieldWithError = renderWithError(renderField);

class SignInContainer extends React.Component {


    render() {

        const { submitting, handleSubmit } = this.props;

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={4} smOffset={4}>
                        <Form onSubmit={handleSubmit} className="sign-up-container">
                            <Field validate={required} className="block margin-top-small" component={renderFieldWithError} name="email" placeholder="email"/>
                            <Field
                                validate={required}
                                className="block margin-top-small"
                                component={renderFieldWithError}
                                type="password"
                                name="password"
                                placeholder="password"
                            />
                            <Button className="margin-top-small" block isLoading={submitting} type="submit">
                            התחברות
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const SignInForm = reduxForm({ form: 'login' })(SignInContainer);

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: (data) => {
            return dispatch(signInUser(data)).then(action => {
                if (!_.get(action, 'error')) {
                    ownProps.history.push('/');
                }
            });
        }
    }
}

export default connect(null, mapDispatchToProps)(SignInForm)
